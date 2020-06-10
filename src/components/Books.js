import React, { Component } from 'react';
import firebase from '../firebase.js';
import Delete from '../common/Delete';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


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

    // displaying books currently in the database
    componentDidMount() {
        //set up listener to firebase database

        const dbRef = firebase.database().ref('/books');
        dbRef.on('value', (result) => {

            let data = result.val();
            let books = [];

            for (let i in data) {
                books.push({
                    bookId: i,
                    title: data[i].title,
                    writer: data[i].writer
                });

                this.setState({
                    allBooks: books
                });
            }
        })
    }

    componentWillUnmount() {
        const dbRef = firebase.database().ref('/books');
        dbRef.off()
    }

    //state updates when user's making changes
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //on submit we are saving our form to firebase
    handleSubmit = e => {
        e.preventDefault();
        const newBook = firebase.database().ref('/books');
        //adding to firebase
        newBook.push({
            title: this.state.title,
            writer: this.state.writer
        });
        //clearing input
        this.setState({
            title: "",
            writer: ""
        })
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
                                    <br/> 
                                    by
                                    <strong> {book.writer}</strong></p>
                                    <div>
                                        <Link
                                            to={`/books/${book.bookId}`}
                                        >
                                            <i 
                                                className="fas fa-pen-nib"  title="write your P.S."
                                            >
                                            </i>
                                        </Link>

                                        <Delete book={book}/>
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
