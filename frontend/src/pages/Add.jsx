import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//rafce
const Add = () => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8800" ;

    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
        cover: ""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setBook(prev=>({...prev, [e.target.name]: e.target.value }));
    };

   const handleClick = async e =>{
    e.preventDefault()
    try{
        await axios.post(`${API_URL}/books`, book)
        navigate("/")
    }catch(err){
        console.log(err)
    }
   }
console.log(book)
  return (
    <div className='form'>
   <h1>Add New Book</h1>
   <input type="text" placeholder="title" onChange={handleChange} name="title"/>
   <input type="text" placeholder="description" onChange={handleChange} name="description"/>
   <input type="number" placeholder="price" onChange={handleChange} name="price"/>
   <input type="text" placeholder="cover" onChange={handleChange} name="cover"/>
   <input type="text" placeholder="writer" onChange={handleChange} name="writer"/>
   <input type="text" placeholder="version" onChange={handleChange} name="version"/>
   <button onClick={handleClick} className='addButton'>
    Add
   </button>
    </div>
  )
}

export default Add
