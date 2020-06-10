import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter,Route, Link } from "react-router-dom";
import Books from './components/Books';
import singleBook from './components/singleBook'
import './App.css';
class App extends Component {

  render() {
    return (
      <HashRouter basename="/">
        <Route exact path="/">
          <div className="wrapper">
            <div className="landingPage">
              <div className="note">
                <h3>Hello there!</h3>
                <p>If you like to read, you probably have many things to say about books. Either you have a strong opinion about character, story or just want to save your favourite quote.</p>
                <p>Epilogue is online book diary created by book lover for book lovers.</p>
              </div>

              <div className="epilogue">
                <div>
                  <h1>EPILOGUE</h1>
                  <h2>Book Diary</h2>
                </div>
              </div>
            </div>

            <div className="nextPage">
              <Link to="/books">TURN THE PAGE</Link>
            </div>
            
          </div>

        </Route>

        <Route exact path="/books" component={Books} />
        <Route path="/books/:id" component={singleBook} />
      </HashRouter>
    )
  }
}

export default App
