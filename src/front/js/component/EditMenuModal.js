import React, { useContext, useEffect, useState } from 'react'
import "../../styles/editMenuModal.css"
import { Context } from '../store/appContext'


const EditMenuModal = ({productId, setProductId}) => {
    const {store, actions} = useContext(Context)

const [updatedFormData, setUpdatedFormData] = useState([])
const categoryName = ["Starters", "Mains", "Desserts", "Drinks"];
const [isUpdated, setIsUpdated] = useState(false)

const onSave = async(updatedFormData) => {
await actions.updateProductById(productId, updatedFormData.name, updatedFormData.price, updatedFormData.description, updatedFormData.image, updatedFormData.category)

  setIsUpdated(true)
  setProductId(""),
  setIsUpdated(false)   // Ocultar mensaje después de 3 segundos
  
}


const handleSubmit = (event) => {
  event.preventDefault();
    onSave(updatedFormData)
}


const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
}


    const fetchProductById = async (id) => {
        const product = await actions.getProductById(id);
        setUpdatedFormData(product)
      }
      console.log(updatedFormData)

useEffect( () => {
    fetchProductById(productId)
},[productId])
// useEffect(() => {
//   let isMounted = true;
//   if (productId && isMounted) {
//       fetchProductById(productId);
//   }
//   return () => {
//       isMounted = false;
//   };
// }, [productId]);
  return (
    
    <div>
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form method='PUT' onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={updatedFormData.name} onChange={handleChange}/>
          </label>
          <label>
            Price:
            <input type="text" name="price" value={updatedFormData.price} onChange={handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={updatedFormData.description} onChange={handleChange}></textarea>
          </label>
          <label>
            Category:
            <select className="category-dropdown" name="category" onChange={handleChange} >
                {categoryName.map((name, index) => (<option key={index} value={name} >{name}</option>))} </select>
          </label>
          <label>
            Image URL:
            <input type="text" name="image" value={updatedFormData.image} onChange={handleChange}/>
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => {setProductId("")}}>Cancel</button>
        </form>
        {isUpdated && <div className='update-message'>Product updated!</div>}
      </div>
    </div>
    </div>
  )
}

export default EditMenuModal
