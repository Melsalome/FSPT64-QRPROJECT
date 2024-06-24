import React, { useContext, useEffect, useState } from 'react'
import "../../styles/editMenuModal.css"
import { Context } from '../store/appContext'


const EditMenuModal = ({productId, setProductId}) => {
    const {store, actions} = useContext(Context)

const [updatedFormData, setUpdatedFormData] = useState([])
const categoryName = ["Starters", "Mains", "Desserts", "Drinks"];
const [isUpdated, setIsUpdated] = useState(false)
const [imageFile, setImageFile] = useState(null);
const [newProductData, setNewProductData] = useState({});

const handleFileChange = (event) => {
  setImageFile(event.target.files[0]);
};

const handleUpload = async () => {
  if (!imageFile) {
    console.error('No file selected');
    return null;
  }

  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', 'qrproject'); 

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dmcqru5na/image/upload', { 
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
};




const onSave = async(updatedFormData) => {
  let imageUrl = newProductData.image;

    if (imageFile) {
      imageUrl = await handleUpload();
      newProductData.image = imageUrl; 
    }

await actions.updateProductById(productId, updatedFormData.name, updatedFormData.price, updatedFormData.description, imageUrl, updatedFormData.category)

  setIsUpdated(true)
  setProductId(""),
  setIsUpdated(false)  
  
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
              <select className="category-dropdown" name="category" onChange={handleChange}>
                <option value="Select category">Select category</option>
                  {categoryName.map((name, index) => (<option key={index} value={newProductData.category} >{name}</option>))} </select>
            </label>
          <label>
                Upload Image:
                <input type="file" onChange={handleFileChange} />
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
