import React, { Component } from 'react';
import firebase from '../firebase.js';
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

    // retriving book details from firebase
    componentDidMount() {
        // set up listener to listen for firebase updates
        const dbRef = firebase.database().ref('/books');
        dbRef.on('value', (result) => {
            
            let data = result.val();
            let books = [];
            // pushing books from firebase to local state
            for (let i in data) {
                if('/books/' + i === `${window.location.pathname}`) {
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
        })
    }
    //state updates when user's making changes
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleAdd = e => {
        e.preventDefault();
        const newPost = firebase.database().ref(`/books/${this.state.singleBook[0].bookId}`).child('/postscript');
        //just to alert user that it's submitted
        // alert('Submited!');
        // adding to firebase
        newPost.push({
            postscript: this.state.postscript
        });

        //clearing input
        this.setState({
            postscript: ""
        })
    }

    
    render() {
        return (
            <div className="wrapper">
                <div className="singleBook">
                <form action="" onSubmit={this.handleAdd}>
                    <h2>ADD NEW POSTSCRIPT</h2>
                    <label htmlFor="postscript" className="sr-only">Add Postscript</label>
                    <textarea
                        name="postscript"
                        id="postsript"
                        cols="30"
                        rows="10"
                        value={this.state.postscript}
                        onChange={this.handleChange}
                    >
                    </textarea>
                    <button type="submit">ADD</button>
                </form>

                {this.state.singleBook.map((book) => {
                    return (
                        <div className="post">
                            <h2><strong>{book.title}</strong> by <strong>{book.writer}</strong></h2>
                            <div className="singlePost">
                                <Post id={book.bookId}/>
                            </div>
                        </div>
                    )
                })}
                </div>
                <Link className="linkBack" exact to="/books">Back</Link>
            </div>
        )
    }
}

export default singleBook
