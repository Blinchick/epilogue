import React from 'react';
import firebase from '../firebase';

function ChangePost(props) {

    const itemRef = firebase.database().ref(`books/${props.bookId}/postscript/${props.post.postId}`);

    // conditionsl statement to check which buttons to display
    function displayButtons(updateButton, modifyButton) {
        // hidden textarea
        let textarea = document.querySelector(`textarea[id = '${props.post.postId}']`)
        // changing visibility
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

    const handleDeletePost = e => {
        e.preventDefault();
        itemRef.remove();
    }

    const handleUpdatePost = e => {
        e.preventDefault();
        // getting references to the buttons
        let updateButton = e.currentTarget;
        let modifyButton = document.querySelector(`button.modify.${props.post.postId}`);

        // passing references to displayButton
        displayButtons(updateButton, modifyButton);
    }

    const handleModifyPost = e => {
        e.preventDefault();
        
        // if user hasn't made any changes, we want to update with the value from state
        // if (props.newValue === null) {
        //     console.log(itemRef);
        // } else {
        // }
        itemRef.update({ postscript: `${props.newValue}` });

        // getting references to the buttons
        let modifyButton = e.currentTarget;
        let updateButton = document.querySelector(`button.update.${props.post.postId}`);

        // passing references to displayButton
        displayButtons(updateButton, modifyButton);
    }

    return (
        <React.Fragment>
            <br/>
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
                className={`delete ${props.post.postId}`}
                title="delete"
            >
                <i className="far fa-trash-alt">
                </i>
            </button>

        </React.Fragment>
    )
}

// styles inline to make funcion work
const modifyButtonStyle = {
    display: 'none'
}

export default ChangePost;