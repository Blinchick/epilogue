import React from 'react';
import firebase from '../firebase';

function ChangePost(props) {
    console.log(props)

    const itemRef = firebase.database().ref(`books/${props.bookId}/postscript/${props.post.postId}`);

    const handleDeletePost = e => {
        e.preventDefault();
        itemRef.remove();
    }

    const handleUpdatePost = e => {
        e.preventDefault();
        console.log(e.currentTarget)
        // getting references to buttons
        let updateButton = e.currentTarget;
        let modifyButton = document.querySelector(`button.modify.${props.post.postId}`);
        let ty = document.querySelector('button.modify');
        console.log(ty)
        // hidden textarea
        let textarea = document.querySelector(`textarea[id = '${props.post.postId}']`)
        // changing visibility
        if (textarea.style.display === "none") {
            textarea.style.display = "inline";
            updateButton.style.display = "none";
            modifyButton.style.display = "inline";
        } else {
            // textarea.style.display = "none";
            updateButton.style.display = "inline";
            modifyButton.style.display = "none";
        }
    }

    const handleModifyPost = e => {
        e.preventDefault();
        itemRef.update({ postscript: `${props.newValue}` });

        let modifyButton = e.currentTarget;
        let updateButton = document.querySelector(`button.update.${props.post.postId}`);
        let textarea = document.querySelector(`textarea[id = '${props.post.postId}']`)
        if (textarea.style.display === "none") {
            textarea.style.display = "inline";
            updateButton.style.display = "none";
            modifyButton.style.display = "inline";
        } else {
            textarea.style.display = "none";
            updateButton.style.display = "inline";
            modifyButton.style.display = "none";
        }
    }

    return (
        <React.Fragment>

            <button
                onClick={handleUpdatePost}
                className={`update ${props.post.postId}`}
                title="update P.S."
                // id={props.post.postId}
            >
                <i className="far fa-edit"></i>
            </button>

            <button
                // inline style to make handleModify works
                style={modifyButtonStyle}
                onClick={handleModifyPost}
                className={`modify ${props.post.postId}`}
                title="done"
            >
                <i className="far fa-check-square"></i>
            </button>

            <button
                onClick={handleDeletePost}
                className="delete"
                title="delete"
            >
                <i className="far fa-trash-alt">
                </i>
            </button>

        </React.Fragment>
    )
}

const modifyButtonStyle = {
    display: 'none'
}

export default ChangePost;

// update button
// on click see post script text