import React, { Component } from 'react';
import firebase from '../firebase.js';
import booksService from '../services/books.service'
import Post from './Post';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class singleBook extends Component {
    constructor() {
        super();
        this.state = {
            // array of books from firebase
            singleBook: []
        };
    }

    componentDidMount() {
        booksService.getAll().on('value', this.onDataChange)
    }

    componentWillUnmount() {
        booksService.getAll().off('value', this.onDataChange)
    }
    
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onDataChange = res => {
        let data = res.val();
        let books = [];
        // pushing books from firebase to local state
        for (let i in data) {
            if ('/books/' + i === `${this.props.location.pathname}`) {
                books.push({
                    bookId: i,
                    title: data[i].title,
                    writer: data[i].writer
                });
            }

            this.setState({
                singleBook: books
            });
        }
    }
    
    handleAdd = e => {
        e.preventDefault();
        const newPost = firebase.database().ref(`/books/${this.state.singleBook[0].bookId}`).child('/postscript');
        newPost.push({
            postscript: this.state.postscript
        });


        this.setState({
            postscript: ""
        })
    }

    
    render() {
        return (
            <div className="wrapper">
                <div className="singleBook">

                    {this.state.singleBook.map((book) => {
                        return (
                            <div className="post">
                                <h2>
                                    Title: {book.title} 
                                    <br/>
                                    Writer: {book.writer}</h2>
                                <div className="singlePost">

                                    <Post id={book.bookId} />

                                </div>
                            </div>
                        )
                    })}

                    <form className="addPost" action="" onSubmit={this.handleAdd}>
                        <h2>ADD NEW POSTSCRIPT</h2>
                        <label htmlFor="postscript" className="sr-only">Add Postscript</label>
                        <textarea
                            name="postscript"
                            id="postsript"
                            cols="30"
                            rows="10"
                            placeholder="Type here anything"
                            minLength="5"
                            value={this.state.postscript}
                            onChange={this.handleChange}
                        >
                        </textarea>
                        <br/>
                        <button type="submit" className="submit">SUBMIT</button>
                    </form>

                </div>
                
                <div className="prevPage">
                    <Link className="linkBack" exact to="/books">Back</Link>
                </div>
            </div>
        )
    }
}

export default singleBook
