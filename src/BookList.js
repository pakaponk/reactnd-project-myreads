import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';

const BookList = ({ books, onUpdateBookShelf }) => {
	const currentlyReadingBooks = books.filter(book => book.shelf === 'currentlyReading');
	const wantToReadBooks = books.filter(book => book.shelf === 'wantToRead');
	const readBooks = books.filter(book => book.shelf === 'read');

	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					<BookShelf books={currentlyReadingBooks} title="Currently Reading" onUpdateBookShelf={onUpdateBookShelf} />
					<BookShelf books={wantToReadBooks} title="Want to Read" onUpdateBookShelf={onUpdateBookShelf} />
					<BookShelf books={readBooks} title="Read" onUpdateBookShelf={onUpdateBookShelf} />
				</div>
			</div>
			<div className="open-search">
				<Link to="/search" >Add a book</Link>
			</div>
		</div>
	);
}

BookList.propTypes = {
	books: PropTypes.array.isRequired,
	onUpdateBookShelf: PropTypes.func.isRequired
};

export default BookList;
