import React, { Component } from 'react';
import firebase from '../firebase.js';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postscripts: [],
            singleBookId: Object.values(this.props).toString()
        };
    }
    
    componentDidMount() {
        const dbRef = firebase.database().ref(`/books/${this.state.singleBookId}/postscript`);
        dbRef.on('value', this.onDataChange)
    }

    componentWillUnmount() {
        const dbRef = firebase.database().ref(`/books/${this.state.singleBookId}/postscript`);
        dbRef.off()
    }

    onDataChange = res => {
        let data = res.val();
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
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDeletePost = e => {
        e.preventDefault();

        let postId = e.currentTarget.className.split(' ').splice(1).join(' ');

        const itemRef = firebase.database().ref(`books/${this.state.singleBookId}/postscript/${postId}`);
        itemRef.remove();
    }

    handleUpdatePost = e => {
        e.preventDefault();

        let postId = e.currentTarget.className.split(' ').splice(1).join(' ');
        let textarea = document.querySelector(`textarea[id = '${postId}']`);

        //buttons reference to change icon
        let modifyButton = document.querySelector(`button.modify.${postId}`);
        let updateButton = document.querySelector(`button.update.${postId}`);
        let currentPost = "";
        const itemRef = firebase.database().ref(`books/${this.state.singleBookId}/postscript/${postId}`);

        //switching to edit mode
        if (textarea.style.display === "none") {
            textarea.style.display = "inline";
            updateButton.style.display = "none";
            modifyButton.style.display = "inline";

        //saving update
        } else {

            textarea.style.display = "none";
            updateButton.style.display = "inline";
            modifyButton.style.display = "none";

            //postcript from the arr in case user decides to not change anything
            this.state.postscripts.map(post => post.postId === postId
                ? currentPost = post.postscripts
                : null);
            console.log(currentPost)

            !this.state.update
            ? itemRef.update({ postscript: `${currentPost}` })
            : itemRef.update({ postscript: `${this.state.update}` });
        }
        
        this.setState({
            update: "",
        })

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

                                <React.Fragment>
                                    <br />
                                    <button
                                        className={`update ${post.postId}`}
                                        onClick={this.handleUpdatePost}
                                        title="update P.S."
                                    // id={props.post.postId}
                                    >
                                        <i className="far fa-edit"></i>
                                    </button>

                                    <button
                                        // inline style to make handleModify works
                                        style={modifyButtonStyle}
                                        className={`modify ${post.postId}`}
                                        onClick={this.handleUpdatePost}
                                        title="done"
                                    >
                                        <i className="far fa-check-square"></i>
                                    </button>

                                    <button
                                        className={`delete ${post.postId}`}
                                        onClick={this.handleDeletePost}
                                        title="delete"
                                    >
                                        <i className="far fa-trash-alt">
                                        </i>
                                    </button>

                                </React.Fragment>
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

const modifyButtonStyle = {
    display: 'none'
}

export default Post;