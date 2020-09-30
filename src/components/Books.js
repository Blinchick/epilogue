import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import booksService from '../services/books.service.js';

class Books extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            writer: "",
            poscript: "",
            // to display books
            allBooks: []
        };
    }

    componentDidMount() {
        booksService.getAll().on("value", this.onDataChange);
    }

    componentWillUnmount() {
        booksService.getAll().off("value", this.onDatachange);
    }

    onDataChange = res => {
        let books = [];
        let data = res.val()
        console.log(data)
        for (let i in data) {
            books.push({
                bookId: i,
                title: data[i].title,
                writer: data[i].writer
            });
        }
        this.setState({
            allBooks: books
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        let newBook = {
            title: this.state.title,
            writer: this.state.writer
        }
        booksService.create(newBook)
            .then(() => {
                this.setState({
                    title: "",
                    writer: ""
                })
            }).catch((e) => {
                console.log(e)
            })
    }

    handleDelete = (e) => {
        e.preventDefault();
        booksService.delete(`${e.currentTarget.name}`);
    }

    render() {
        return (
            <div className="wrapper">
                <div className="displayBooks">
                    <form action="">
                        <h2>Add Book</h2>
                        <label htmlFor="title" className="sr-only">Add Book</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={this.handleChange}
                            value={this.state.title}
                            placeholder="Add Book"
                            // submit an empty value
                            minLength="5"
                        />
                        <br />
                        <label htmlFor="writer" className="sr-only">Add Writer</label>
                        <input
                            type="text"
                            name="writer"
                            id="writer"
                            onChange={this.handleChange}
                            value={this.state.writer}
                            placeholder="Add Writer"
                            // user can't submit an empty value
                            minLength="5"
                        />
                        <br />
                        <button
                            onClick={this.handleSubmit}
                            type="submit"
                            className="submit"
                        >
                            Submit
                        </button>
                    </form>

                    <div
                        className="oneBook"
                        onClick={this.handleBook}
                    >
                        <h2>MY BOOKS</h2>
                        <div className="allBooks">
                            {
                                this.state.allBooks.map((book) => {
                                    return (
                                        <div
                                            className={`books ${book.bookId}`}
                                            id={`${book.bookId}`}
                                            key={book.bookId}
                                        >
                                            <p><strong>{book.title} </strong>
                                                <br />
                                    by
                                    <strong> {book.writer}</strong></p>
                                            <div>
                                                <Link
                                                    to={`/books/${book.bookId}`}
                                                >
                                                    <i
                                                        className="fas fa-pen-nib" title="write your P.S."
                                                    >
                                                    </i>
                                                </Link>

                                                <button onClick={this.handleDelete} className="delete" title="delete" name={`${book.bookId}`}><i className="far fa-trash-alt"></i></button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="prevPage">
                    <Link className="linkBack" exact to="/">Back</Link>
                </div>
            </div>


        )
    }
}

export default Books