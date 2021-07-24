import React from 'react'
import './App.css'
import './App'
import { Link } from "react-router-dom";

class SearchArea extends React.Component {


    state = {
        query: "",
        searchResults: []
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">


                    <Link to="/">

                        <button className="close-search">Close</button>
                    </Link>


                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author" onChange={(event) => {
                            this.searchTerm(event.target.value)
                        }} />

                    </div>
                </div>

                {this.state.query !== '' && (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.resultsList()}

                        </ol>
                    </div>
                )}

            </div>
        )
    }

    searchTerm = async (term) => {
        this.setState({
            query: term
        })

        await this.props.searchBooks(term).then(res => {
            this.setState({
                searchResults: res
            })
        }).catch(err => console.log(err))

    }


    resultsList = () => {

        return this.state.searchResults?.map(book => {

            return <div className="book" key={book.industryIdentifiers[0]?.identifier}>
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks?.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        {this.props.getOptions(book, book.shelf)}
                    </div>
                </div>
                <div className="book-title"> {book.title}</div>
                {
                    book.authors?.map((author) => {
                        return (
                            <div className="book-authors" key={author}>{author}</div>
                        )
                    })


                }

            </div>
        })
    }

}

export default SearchArea