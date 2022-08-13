import React , { useState } from 'react'
import { Link } from "react-router-dom";
import Shelf from './Shelf'
const Home = ({books, changeShelf}) => {

    return (
  
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>

        <Shelf section='Currently Reading' books={books} category='currentlyReading' onChangeShelf={changeShelf}/>
        <Shelf section='Want To Read' books={books} category='wantToRead' onChangeShelf={changeShelf}/>
        <Shelf section='Read' books={books} category='read' onChangeShelf={changeShelf}/>

        </div>
      </div>
      <div className="open-search">
        <Link to="/search"  className="open-search-link" >Add a book</Link>

      </div>
    </div>
  )
  }

export default Home