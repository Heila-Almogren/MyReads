import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import './App'
import { Link } from "react-router-dom";

class Book extends PureComponent {

    constructor(props) {
        super(props)

    }


    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select
                            onChange={(event) => {
                                this.props.moveBook(book, event.target.value)
                            }}>
                            {this.props.getOptions(book.shelf)}
                        </select>
                    </div>
                </div>
                <div className="book-title"> {book.title}</div>
                {
                    book.authors.map((author) => {
                        return (
                            <div className="book-authors" key={author}>{author}</div>
                        )
                    })
                }

            </div>
        )
    }
}

export default Book