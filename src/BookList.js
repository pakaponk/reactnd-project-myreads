import React from 'react';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';

function BookList({ books }){
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
					<BookShelf books={currentlyReadingBooks} title="Currently Reading"/>
					<BookShelf books={wantToReadBooks} title="Want to Read"/>
					<BookShelf books={readBooks} title="Read"/>
				</div>
			</div>
			<div className="open-search">
				<Link to="/search" >Add a book</Link>
			</div>
		</div>
	);
}

export default BookList;
