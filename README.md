This is the complete version of the final assessment project for Udacity's React Fundamentals course, developed by [React Training](https://reacttraining.com).

The objective of this project is to create a bookshelf app that allows users to select and categorize books they have read, are currently reading, or want to read. The project emphasizes using React to build the application and provides an API server and client library that the application will use to persist information as users interact with the application.

Note that the CSS, API server and client library are provided by [Udacity React Nanodegree Program](https://www.udacity.com/course/react-nanodegree--nd019). 
You can find more details about the API at [Backend Server](#BackendServer) section.

## Installation

1.	Clone this repository to your local machine.
2.	Go to the directory that your cloned it to.
3.	Run `npm install`.
4.	Run `yarn start` or `npm start`.
5.	Open `http://localhost:3000/` to see the app.

## <a name="BackendServer"></a>Backend Server

 The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods for perform necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results. 

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
