import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
//
const Books = () => {

    const API_URL = (window.location.hostname.includes("rc.bestziyu.xyz") ? "https://rc.bestziyu.xyz/api" : import.meta.env.VITE_API_URL || "http://localhost:8800" );

    const [books, setBooks] = useState([])

    useEffect(()=>{
    const fetchAllBooks = async ()=>{
        try {
          const res = await axios.get(`${API_URL}/books`)
          setBooks(res.data)
          console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    fetchAllBooks()
    },[])


    const handleDelete = async (id)=>{
        try{
        await axios.delete(`${API_URL}/books/${id}`)
        window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
      <h1>Lama Book Shop</h1>
      <div className="books">
        {books.map(book=>(
        <div className="book" key={book.id}>
          {book.cover &&  <img src={book.cover} alt="" />}
          <h2>{book.title}</h2>
          <p><strong>{book.description}</strong></p>
         <span>${book.price}</span>
         <button className="delete" onClick={()=>handleDelete(book.id)}>
            Delete
         </button>
         <button className="update">
           <Link to={`/update/${book.id}`}>Update</Link>
         </button>
        </div>
        ))}
      </div>
      <button className='addBookButton'>
       <Link to="/add">Add new Book</Link>
      </button>
    </div>
  )
}

export default Books
