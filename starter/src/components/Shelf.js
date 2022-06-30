import React from 'react'
import Book from './Book'

const Shelf = ({section, books, category,onChangeShelf}) => {
    

    console.log(books);
    const booksCategory = books.filter((book) => book.shelf === category)
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{section}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">{
                booksCategory.map((book)=>(

                    <Book key={book.id} book={book} onChangeShelf={onChangeShelf}/>

                ))}
                </ol>
            </div>
        </div>
        )
    };

export default Shelf