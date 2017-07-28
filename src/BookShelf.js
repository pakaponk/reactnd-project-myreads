import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

function BookShelf({ books, title, onUpdateBookShelf }){
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{ title }</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{ books.map(book => (
						<li key={book.id}>
							<Book book={book} onUpdateBookShelf={onUpdateBookShelf} />
						</li>
					))}
				</ol>
			</div>
		</div>
	);
}

BookShelf.propTypes = {
	title: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	onUpdateBookShelf: PropTypes.func.isRequired
};

export default BookShelf;
