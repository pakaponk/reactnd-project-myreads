import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Book from './Book';


class BookSearch extends React.Component{

	static propTypes = {
		searchResult: PropTypes.array.isRequired,
		onUpdateBookShelf: PropTypes.func.isRequired,
		onSearchBooks: PropTypes.func.isRequired,
		onClearSearchResult: PropTypes.func.isRequired
	}

	componentDidMount(){
		this.props.onClearSearchResult();
	}

	render(){
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
						<input type="text" placeholder="Search by title or author"
							onChange={(event) => this.props.onSearchBooks(event.target.value.trim())} />
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.props.searchResult.map(book => (
							<li key={book.id}>
								<Book book={book}
									onUpdateBookShelf={this.props.onUpdateBookShelf} />
							</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default BookSearch;
