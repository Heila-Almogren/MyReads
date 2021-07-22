import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchArea from './searchArea'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

    books: [],

  }


  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      })
    })
  }



  render() {
    return (
      <div className="app">


        <Route exact path='/' render={() => (
          <BooksList BookList={(shelf) => this.listAllBooks(shelf)} />
        )} />


        <Route path='/search' render={({ history }) => (
          <SearchArea
            searchBooks={(term) => this.searchBooks(term)}
            moveBook={(book, shelf) => this.moveBook(book, shelf)}
            getOptions={(shelf) => this.getOptions(shelf)}
          ></SearchArea>
        )} />

      </div>
    )
  }


  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)

    let index = this.state.books.findIndex(elm => book.id === elm.id)

    let new_books = [
      ...this.state.books.slice(0, index),
      ...[Object.assign({}, this.state.books[index], { shelf: shelf })],
      ...this.state.books.slice(index + 1)
    ]



    book.shelf = shelf
    this.setState((currentState) => ({
      books: currentState.books.filter(b => b.id !== book.id).concat(book)

    }
    ))

  }

  searchBooks = async (term) => {
    // return this.state.books.filter(book => book.title.toLowerCase().includes(term.toLowerCase()) || book.authors.find(el => el.toLowerCase().includes(term.toLowerCase())))
    console.log("searchBooks " + term)
    let result = await BooksAPI.search(term).then((res) => {
      console.log("searchBooks promise success " + res)
      return res
    }).catch(err => console.log(err))
    console.log("result: " + result)
    let found = result["error"] ? false : true
    console.log("Found results??? " + found)
    return found ? result : []
  }


  getOptions = (shelf) => {
    let options = [
      {
        label: 'Move to...',
        value: 'move'
      },
      {
        label: 'Currently Reading',
        value: 'currentlyReading'
      },
      {
        label: 'Want to Read',
        value: 'wantToRead'
      },
      {
        label: 'Read',
        value: 'read'
      },
      {
        label: 'None',
        value: 'none'
      }


    ]

    return (
      options.map(option => {
        return <option
          value={option.value}
          key={option.value}
          disabled={option.value === shelf || option.value === 'move'}
          selected={option.value === shelf}
        >
          {option.label}
        </option>
      })
    )


  }




  listAllBooks(shelf) {

    return this.state.books.filter(book => {
      return book.shelf === shelf
    }).map(book => {
      return (<li
        key={book.industryIdentifiers[0]?.identifier}
      >
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks?.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select
                onChange={(event) => {
                  this.moveBook(book, event.target.value)
                }}>
                {this.getOptions(shelf)}
              </select>
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
      </li>)
    })
  }

}

export default BooksApp
// JSON.stringify(book)