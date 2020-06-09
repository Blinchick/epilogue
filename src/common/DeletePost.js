import React from 'react';
import firebase from '../firebase';

function DeletePost(props) {

    const deletePost = (e) => {
        console.log(props.bookId);
        console.log(props.post.postId);
        e.preventDefault();
        const itemRef = firebase.database().ref(`books/${props.bookId}/postscript/${props.post.postId}`);
        itemRef.remove();
    }

    return (
        <React.Fragment>
            <button onClick={deletePost} className="delete" title="delete"><i className="far fa-trash-alt"></i></button>
        </React.Fragment>
    )
}

export default DeletePost;