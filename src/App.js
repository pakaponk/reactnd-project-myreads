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
		books: [],
		searchResult: []
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

	handleClearSearchResult = () => {
		this.setState({ searchResult: [] });
	}

	handleSearchBooks = (query) => {
		if (query.length)
		{
			BooksAPI.search(query, 20)
			.then(books => {
				if (books.error && books.error === 'empty query')
				{
					this.handleClearSearchResult();
				}
				else
				{
					this.updateSearchResult(books);
				}
			});
		}
		else
		{
			this.handleClearSearchResult();
		}
	}

	addNewBookToLocalLibrary(newBook, shelf){
		newBook = Object.assign({}, newBook, { shelf });

		this.setState((state) => ({
			books: [...state.books, newBook],
			searchResult: state.searchResult.length ?
				state.searchResult.map(book => newBook.id === book.id ? newBook : book) : []
		}));
	}

	updateBookInLocalLibrary(updatingBook, shelf){
		updatingBook = Object.assign({}, updatingBook, { shelf: shelf });

		this.setState((state) => ({
			books: state.books.map(book =>
				book.id === updatingBook.id ? updatingBook : book
			),
			searchResult: state.searchResult.length ?
				state.searchResult.map(book => updatingBook.id === book.id ? updatingBook : book) : []
		}));
	}

	removeBookFromLocalLibrary(removingBook, shelf){
		this.setState((state) => ({
			books: state.books.filter(book => removingBook.id !== book.id)
		}));
	}

	/**
	 * Update `searchResult` state if the result is not identical with the current one
	 * @param Array books - the search result books
	 */
	updateSearchResult(books){
		const booksMap = books.reduce(
			(map, book) => map.set(book.id, book),
			new Map()
		);

		if (!this.state.searchResult.length || this.state.searchResult.some(book => !booksMap.has(book.id)))
		{
			books = books.map(book => {
				const existedBook = this.state.books.find(b => b.id === book.id);
				return existedBook ? existedBook : Object.assign({}, book, {
					shelf: "none"
				});
			});

			this.setState({ searchResult: books });
		}
	}

	render() {
		const { books, searchResult } = this.state;

		return (
			<div className="app">
				<Route path="/search" render={() => (
					<BookSearch searchResult={searchResult}
						onUpdateBookShelf={this.handleUpdateBookShelf}
						onSearchBooks={this.handleSearchBooks}
						onClearSearchResult={this.handleClearSearchResult} />
				)} />
				<Route exact path="/" render={() => (
					<BookList books={books} onUpdateBookShelf={this.handleUpdateBookShelf} />
				)} />
			</div>
		);
	}
}

export default BooksApp;
