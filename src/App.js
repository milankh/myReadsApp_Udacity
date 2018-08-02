import "./App.css";
import React from "react";
import Shelf from "./Shelf";
import Search from "./Search";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";


class BooksApp extends React.Component {

    state = {
        books: [],
        searchBooks: []

    };

   //Sets the values for component as soon as its mounted 
    componentDidMount() {
        this.fetchBooks();
    }

     //Fetches books from the BooksAPI
    fetchBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    //Returns the specific shelf
    getShelfBooks(shelfName){
        return this.state.books.filter((b) => b.shelf === shelfName)
    }


    //Takes a book and name of self to be changed and place the book in there
    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then(() => {
            // Updates the local copy of the book
            book.shelf = newShelf;

            //Filters and places the new book at the end of the existing ones
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([ book ])
            }));
        });
    };

    //Performs search in BooksAPI and sets the new state of the books for searchedBooks
    updateQuery = (query) => {
        if(query){
            BooksAPI.search(query).then((books) => {
                if(books.error){
                    this.setState({
                        searchBooks: []
                    })
                }else {
                    this.updateBook(books);
                }
            });
            }else{
                this.setState({
                    searchBooks: []
                })
            }
    };

    //Sets state with returned books only if the response is successful 
    updateBook= (books) => {
        books.forEach((book, index) => {
            let myBook = this.state.books.find((b) => b.id === book.id);
            book.shelf = myBook ? myBook.shelf : 'none';
            books[index] = book;
        });

        this.setState({
            searchBooks: books
        });
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Shelf
                                    title="Currently Reading"
                                    books={this.getShelfBooks("currentlyReading")}
                                    changeShelf={this.changeShelf}
                                />
                                <Shelf
                                    title="Want to Read"
                                    books={this.getShelfBooks("wantToRead")}
                                    changeShelf={this.changeShelf}
                                />
                                <Shelf
                                    title="Read"
                                    books={this.getShelfBooks("read")}
                                    changeShelf={this.changeShelf}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route path="/search" render={({ history }) => (
                    <Search
                        books={this.state.searchBooks}
                        updateQuery={this.updateQuery}
                        changeShelf={this.changeShelf}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp