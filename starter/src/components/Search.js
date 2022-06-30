import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

const Search = ({ books, changeShelf }) => {
  const [queryValue, setQueryValue] = useState('');
  const [resbooks, setResBooks] = useState('');

  const updateQueryValue = (queryValue) => {
    setQueryValue(queryValue);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const fetch = async () => {
        const res = await BooksAPI.search(String(queryValue));
        res.error !== 'empty query'
          ? compareShelfBooks(res, books)
          : setResBooks();
      };
      queryValue !== '' ? fetch() : setResBooks();
    }, 500);
    return () => clearTimeout(timeOut);
  }, [books, queryValue]);

  const compareShelfBooks = (resBooks, shelfBooks) => {
    const bookUpdates = Object.fromEntries(
      shelfBooks.map((temp) => [temp.id, temp])
    );
    const updatedBooks = resBooks.map((temp) => bookUpdates[temp.id] || temp);
    setResBooks(updatedBooks);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            name="book-data"
            placeholder="Search by title, author, or ISBN"
            value={queryValue}
            onChange={(event) => updateQueryValue(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
      <ol className="books-grid">
        {resbooks ? (
          resbooks.map((book) => (
            <li key={book.id}>
              <Book
                key={book.id}
                book={book}
                onChangeShelf={changeShelf}
              ></Book>
            </li>
          ))
        ) : (
          <div>
            <p>No Books found</p>
          </div>
        )}
      </ol>
    </div>
  );
};

export default Search;
