import React from 'react'
import { useState } from 'react';
import * as BooksAPI from './BooksAPI'
import {useNavigate} from "react-router-dom";

const Book = ({book,onChangeShelf}) => {
  const [selected, setSelected] = useState('');
  
  
  const isShelfUndefined = book.shelf === undefined;
  
  useState(() => {
    isShelfUndefined ? setSelected('none') : setSelected( book.shelf );
  });
  const UpdateShelf = (event) =>{
    
    setSelected(event.target.value);
    onChangeShelf(book,event.target.value);
  };
  
  const getThumbnail = () => {
    const thumbnail = book?.imageLinks?.thumbnail
      ? `url(${book.imageLinks.thumbnail})`
      : ``;
    return thumbnail;
  };

  const getAuthors = () => {
    const authors = book?.authors ? book.authors.join(', ') : ``;
    return authors;
  };
      
  return (
    <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{width: 128, height: 188, backgroundImage:getThumbnail(),}}
        ></div>
        <div className="book-shelf-changer">
        <select onChange={UpdateShelf} value={selected}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{getAuthors()}</div>
    </div>
  </li>
    )
}

export default Book