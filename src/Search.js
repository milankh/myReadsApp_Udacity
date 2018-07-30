import Book from "./Book";
import PropTypes from "prop-types";
import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Debounce } from "react-throttle";


class Search extends Component{
    state = {
        results: false
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    };

    updateQuery = (query) => {
        this.props.updateQuery(query.trim());
    };

    // Resets search results for next search
    componentWillUnmount(){
        this.props.updateQuery("");
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="500" handler="onChange">
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                            <li key={book.id} className="contact-list-item">
                                <Book
                                    book={book}
                                    changeShelf={this.props.changeShelf} />
                            </li>
                        ))}
                    </ol>
            
                </div>
            </div>
        )
    }
}

export default Search;