import React, { Component } from 'react';
import DeletePost from '../common/DeletePost';
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
                        postId: i,
                        postscripts: data[i].postscript
                    });

                this.setState({
                    postscripts: posts
                });

                console.log(posts)
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.postscripts.map((post) => {
                    return (
                        <React.Fragment>
                            <p>{post.postscripts}</p>
                            <DeletePost post={post}
                            bookId={this.state.singleBookId}/>
                        </React.Fragment>
                    )
                })}
            </div>
        )
    }
}

export default Post;