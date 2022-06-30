import "./App.css";
import React, { useState, useEffect } from 'react';
import * as BooksAPI from './components/BooksAPI'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";


import Home from "./components/Home";

import Search from "./components/Search";



const App = () => {
  const [books, setBooks] = useState([]);
  let UseNav = useNavigate();
  const changeShelf = (book, shelf) => {
    const bookUpdate = async () => {
      await BooksAPI.update(book, shelf);
      const response = await BooksAPI.getAll();
      setBooks(response);
    };

    bookUpdate();

    UseNav('/');

  };

  useEffect(() => {
    const getAllBooks = async () => {

      const response = await BooksAPI.getAll();

      setBooks(response);

    };

    getAllBooks();}, []);



  return (
    <Routes>
      <Route exact path="/" element={<Home books={books} changeShelf={changeShelf} />} ></Route>
      <Route exact path="/search" element={<Search books={books} changeShelf={changeShelf} />} ></Route>
    </Routes>
  );
};

export default App;