import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Books from './components/Books'
import './App.css';
class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/">
          <div className="landingPage wrapper">
            <div className="note">
              <h3>Hello there</h3>
              <p>If you like to read, you probably have many things to say about books. Either you have a strong opinion about character, story or just want to save your favourite quote - epilogue is here for you!</p>
              <p>It's online book diary created for book lovers.</p>
            </div>

            <div className="book">
              <div>
                <h1>EPILOGUE</h1>
                <h2>Book Diary</h2>
              </div>
              <Link to="/books">TURN THE PAGE</Link>
            </div>
          </div>
        </Route>

        <Route path="/books" component={Books} />
      </Router>
    )
  }
}

export default App
