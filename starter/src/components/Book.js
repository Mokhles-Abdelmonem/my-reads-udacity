import React from 'react'
import { useState } from 'react';
import * as BooksAPI from './BooksAPI'
import {useNavigate} from "react-router-dom";

const Book = ({book,onChangeShelf}) => {
  const [selected, setSelected] = useState('');
  
  
  const shelfUndefined = book.shelf === undefined;
  
  useState(() => {
    shelfUndefined ? setSelected('none') : setSelected( book.shelf );
  });

  const UpdateShelf = (event) =>{
    setSelected(event.target.value);
    onChangeShelf(book, event.target.value);
  };
  
  const Authors = () => {
    const authors = book?.authors ? book.authors : ``;
    return authors;
  };

  const imageLinks = () => {
    const imagelink = book?.imageLinks?.thumbnail? `url(${book.imageLinks.thumbnail})`: ``;
    return imagelink;
  };

  if (shelfUndefined){
    var noneDisVal = 'Add to';
    var noneOPVal = '';
  } else {
    var noneDisVal = 'Move to';
    var noneOPVal = <option value="none">None</option>;
  };

  return (
    <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover" style={{width: 128, height: 188, backgroundImage:imageLinks(),}}></div>
        <div className="book-shelf-changer">
          <select onChange={UpdateShelf} value={selected}>
            <option value="none" disabled>{noneDisVal}</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            {noneOPVal}
          </select>         
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{Authors()}</div>
    </div>
  </li>
    )
}

export default Book