import React from 'react';
import firebase from '../firebase';

function Delete(props) {

    const deleteBook = (e) => {
        e.preventDefault();
        const itemRef = firebase.database().ref(`/books/${props.book.bookId}`);
        itemRef.remove();
    }

    return (
        <React.Fragment>
            <button onClick={deleteBook} className="delete" title="delete"><i className="far fa-trash-alt"></i></button>
        </React.Fragment>
    )
}

export default Delete;


