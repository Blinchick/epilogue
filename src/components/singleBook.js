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
                console.log(books)
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
            <div className="wrapper singleBook">
                {this.state.singleBook.map((book) => {
                    return (
                        <div className="post">
                            <p><strong>{book.title}</strong> by <strong>{book.writer}</strong></p>
                            <Post id={book.bookId}/>
                        </div>
                    )
                })}
                <Link exact to="/books">Back</Link>

                <form action="" onSubmit={this.handleAdd}>
                    <label htmlFor="postscript">Add Postscript</label>
                    <textarea 
                        name="postscript" 
                        id="postsript" 
                        cols="30" 
                        rows="10"
                        // value={this.state.postscript}
                        onChange={this.handleChange}
                    >
                    </textarea>
                    <button type="submit">ADD</button>
                </form>
            </div>
        )
    }
}

export default singleBook
