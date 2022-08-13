import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';


const Search = ({ books, changeShelf }) => {
  const [searchValue, setSearchValue] = useState("");
  const [booksRes, setBooks] = useState('');
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    const bookFetch = async () => {
      const result = await BooksAPI.search(String(searchValue));
      console.log(result);

      if (result.error !== 'empty query') {
        setBooks(result)
      }else{
        setBooks();
      };
      
    };
    if (searchValue !== ''){
      bookFetch()
    }else{
      setBooks();
    };
}, [books,searchValue]);
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            name="book-data"
            placeholder="Search by title, author, or ISBN"
            value={searchValue}
            onChange={handleSearchInputChanges}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
      <ol className="books-grid">
        {booksRes ? (booksRes.map((book) => (
            <li key={book.id}>
              <Book
                key={book.id}
                book={book}
                onChangeShelf={changeShelf}>
              </Book>
            </li>))
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
