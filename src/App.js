import React from 'react';
import { Route } from 'react-router-dom';

import BookList from './BookList';
import BookSearch from './BookSearch';

import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		books: []
	}

	componentDidMount(){
		BooksAPI.getAll().then(books => this.setState({
			books
		}));
	}

	handleUpdateBookShelf = (selectedBook, shelf) => {
		if (this.state.books.find(book => selectedBook.id === book.id))
		{
			if (shelf !== 'none')
			{
				this.updateBookInLocalLibrary(selectedBook, shelf);
			}
			else
			{
				this.removeBookFromLocalLibrary(selectedBook, shelf);
			}
		}
		else
		{
			this.addNewBookToLocalLibrary(selectedBook, shelf);
		}

		BooksAPI.update(selectedBook, shelf);
	}

	addNewBookToLocalLibrary(newBook, shelf){
		this.setState((state) => ({
			books: [...state.books, Object.assign({}, newBook, { shelf }) ]
		}));
	}

	updateBookInLocalLibrary(updatingBook, shelf){
		this.setState((state) => ({
			books: state.books.map(book =>
				book.id === updatingBook.id ?
					Object.assign({}, book, { shelf }) : book)
		}));
	}

	removeBookFromLocalLibrary(removingBook, shelf){
		this.setState((state) => ({
			books: state.books.filter(book => removingBook.id !== book.id)
		}));
	}

	render() {
		const { books } = this.state;

		return (
			<div className="app">
				<Route path="/search" render={() => (
					<BookSearch onUpdateBookShelf={this.handleUpdateBookShelf} />)
				} />
				<Route exact path="/" render={() => (
					<BookList books={books} onUpdateBookShelf={this.handleUpdateBookShelf} />
				)} />
			</div>
		);
	}
}

export default BooksApp;
