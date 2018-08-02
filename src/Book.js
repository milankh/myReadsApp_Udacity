import PropTypes from "prop-types";
import React, { Component } from "react";
import ShelfChanger from "./ChangeShelf";

class Book extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired
    };

    render(){
        const { book } = this.props;
        return(
            <div className="book" id={book.id}>
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 135,
                        height: 180,
                        backgroundImage: `url("${ book.imageLinks ? book.imageLinks.thumbnail : null}")` }}>
                    </div>
                    <ShelfChanger
                        book={book}
                        changeShelf={this.props.changeShelf}/>
                </div>
                <div className="book-title">{book.name}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

export default Book;