import React, { useEffect, useState } from 'react'
import CreateProduct from './CreateProduct'
import { Link } from "react-router-dom";


const CategoriesButton = ({ categoryName, setSelectedCategory, setOpenModal, selectedCategory }) => {
  


  return (
    <>
      <div className="menu-header">
        <h1>Menu</h1>
        <div className="menu-buttons">
        <Link to="../app/dashboard">
          <button className='dash'>Dashboard</button>
          </Link>
          <button className='createproduct' onClick={() => { setOpenModal(true) }}> Create New Product
          </button>
        </div>
      </div>
      <div className="menu-categories">

        {categoryName.map((category, index) => (
          <button
            className={`category ${selectedCategory === category ? 'active' : ''}`}
            key={index}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  )
}

export default CategoriesButton
