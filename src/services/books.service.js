import firebase from "../firebase";

const db = firebase.database().ref('/books');

class BooksService {
    getAll() {
        return db;
    }

    create(book) {
        return db.push(book);
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }
}

export default new BooksService();