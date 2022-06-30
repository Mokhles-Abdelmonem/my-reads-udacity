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
  let navigate = useNavigate();


  useEffect(() => {
    const getBooks = async () => {
      const response = await BooksAPI.getAll();
      setBooks(response);
    };
    getBooks();
  }, []);


  const changeShelf = (book, shelf) => {
    const updateBooks = async () => {
      await BooksAPI.update(book, shelf);
      const response = await BooksAPI.getAll();
      setBooks(response);
    };
    updateBooks();
    navigate('/');
  };

  return (
    <Routes>
      <Route exact path="/" element={<Home books={books} changeShelf={changeShelf}></Home>} ></Route>
      <Route exact path="/search" element={<Search books={books} changeShelf={changeShelf}></Search>} ></Route>
    </Routes>
  );
};

export default App;