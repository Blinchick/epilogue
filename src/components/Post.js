import React, { Component } from 'react';
import firebase from '../firebase.js';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postscripts: [],
            // getting id as a string of selected book
            singleBookId: Object.values(this.props).toString()
        };
    }

    componentDidMount() {
        // set up listener to listen for firebase updates
        const dbRef = firebase.database().ref(`/books/${this.state.singleBookId}/postscript`);
        dbRef.on('value', (result) => {

            let data = result.val();
            let posts = [];

            // pushing postscripts from firebase to local state
            for (let i in data) {
                    posts.push({
                        postscripts: data[i].postscript
                    });

                this.setState({
                    postscripts: posts
                });
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.postscripts.map((post) => {
                    console.log(post.postscripts)
                    return (
                        <p>{post.postscripts}</p>
                    )
                })}
            </div>
        )
    }
}

export default Post;