import React, { Component } from 'react';
import ChangePost from '../common/ChangePost';
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
            }
        })
    }

    componentWillUnmount() {
        const dbRef = firebase.database().ref('/books');
        dbRef.off()
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { postscripts, singleBookId, update } = this.state;

        return (
            <div>
                {postscripts.map((post) => {
                    return (
                        <React.Fragment key={post.postId}>
                            <p>{post.postscripts}</p>
                            <form action="">
                                <label htmlFor="update" className="sr-only">Update</label>
                                <textarea
                                // inline style to make handleModify works
                                    style={textareaStyle}
                                    className="update" 
                                    name="update"
                                    // need to access id for modifying
                                    id={post.postId}
                                    cols="10" 
                                    rows="5"
                                    onChange={this.handleChange}
                                    // using defaultValue to allow changes in a textfield
                                    defaultValue={post.postscripts}
                                >
                                </textarea>
                                <ChangePost 
                                    post={post}
                                    bookId={singleBookId}
                                    newValue={update}
                                />
                            </form>
                        </React.Fragment>
                    )
                })}
            </div>
        )
    }

}

// iline style for textarea
const textareaStyle = {
    display: 'none'
}

export default Post;