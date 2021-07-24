import React from 'react'
import './App.css'
import './App'
import { Link } from "react-router-dom";

class BooksList extends React.Component {

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">

                                    {this.props.BookList('currentlyReading')}

                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">

                                    {this.props.BookList('wantToRead')}

                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.props.BookList('read')}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <Link to="/search">
                    <div className="open-search">
                        <button>Add a book</button>
                    </div>
                </Link>

            </div>
        )
    }

}

export default BooksList