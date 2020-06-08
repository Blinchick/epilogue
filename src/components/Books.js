import React, { Component } from 'react';
import firebase from '../firebase.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Books extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            writer: "",
            postscript: "",

            // to display books
            allBooks: [] 
        };
    }

    // displaying books currently in the database
    componentDidMount() {
        //set up listener to firebase database
        const dbRef = firebase.database().ref();
        dbRef.on('value', (result) => {

            let data = result.val();
            let posts = [];

            for (let i in data) {
                posts.push({
                    postId: i,
                    title: data[i].title,
                    writer: data[i].writer
                });

                this.setState({
                    allBooks: posts
                });
            }
        })
    }

    componentWillUnmount() {
        const dbRef = firebase.database().ref();
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
        const newBook = firebase.database().ref();
        console.log(firebase.database())
        //just to alert user that it's submitted
        alert('Submited!');
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
                <form action="">
                    <label htmlFor="title">Add Book</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title"
                        onChange={this.handleChange}
                        value={this.state.title}
                    />

                    <label htmlFor="writer">Add Writer</label>
                    <input
                        type="text"
                        name="writer"
                        id="writer"
                        onChange={this.handleChange}
                        value={this.state.writer}
                    />
                    <button onClick={this.handleSubmit} type="submit">Submit</button>
                </form>

                <div 
                    className="oneBook"
                    onClick={this.handleBook}
                >
                    {
                        this.state.allBooks.map((post) => {
                            return (
                                <div className="post">
                                    <p><strong>{post.title}</strong> by <strong>{post.writer}</strong></p>
                                </div>
                            )
                        })
                    }
                </div>

                <Link exact to="/">Back</Link>
            </div>

            
        )
    }
}

export default Books
