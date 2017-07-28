import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book, onUpdateBookShelf}) => {
	const title = book.title;
	const authors = (book.authors && book.authors.reduce((prev,author) => `${prev}, ${author}`));

	const imageLinks = (book.imageLinks && book.imageLinks.thumbnail) ||
		'https://books.google.co.th/googlebooks/images/no_cover_thumb.gif';

	const style = {
		width: 128,
		height: 193,
		backgroundImage: `url(${imageLinks})`,
		backgroundSize: 'cover'
	};

	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={style}></div>
				<div className="book-shelf-changer">
					<select value={book.shelf} onChange={ (event) => onUpdateBookShelf(book, event.target.value) }>
						<option value="none" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{title}</div>
			{ authors && <div className="book-authors">{authors}</div> }
		</div>
	);
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
	onUpdateBookShelf: PropTypes.func.isRequired
};

export default Book;
