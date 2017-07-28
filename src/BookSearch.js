import React from 'react';
import { Link } from 'react-router-dom';

import Book from './Book';
import * as BooksAPI from './BooksAPI';


class BookSearch extends React.Component{

	state = {
		books : []
	}

	searchBooks(query){
		if (query.length)
		{
			BooksAPI.search(query, 20)
			.then(books => {
				if (books.error && books.error === 'empty query')
				{
					this.setState({ books: []});
				}
				else
				{
					this.setState({ books });
				}
			});
		}
		else
		{
			this.setState({ books: []});
		}
	}

	render(){
		const { books } = this.state;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						{/*
							NOTES: The search from BooksAPI is limited to a particular set of search terms.
							You can find these search terms here:
							https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							you don't find a specific author or title. Every search is limited by search terms.
						*/}
						<input type="text" placeholder="Search by title or author" onChange={(event) => this.searchBooks(event.target.value.trim())} />
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{books.map(book => (
							<li key={book.id}>
								<Book book={book} />
							</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default BookSearch;
