import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';

import BookList from './BookList';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		showSearchPage: true,
		books: []
	}

	componentDidMount(){
		BooksAPI.getAll().then(books => this.setState({
			books
		}));
	}

	handleBookSearchOpen = () => {
		this.setState({
			showSearchPage: true
		});
	}

	handleBookSearchClose = () => {
		this.setState({
			showSearchPage: false
		});
	}

	render() {
		const { books } = this.state;

		return (
			<div className="app">
				{this.state.showSearchPage ? (
					<BookSearch onClose={this.handleBookSearchClose} />
				) : <BookList onAddNewBook={this.handleBookSearchOpen} books={books} />}
			</div>
		);
	}
}

export default BooksApp;
