import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const CreateProduct = ({ handleCloseModal, setOpenModal}) => {
  const { store, actions } = useContext(Context);
  const [newProductData, setNewProductData] = useState({});
  const categoryName = ["Starters", "Mains", "Desserts", "Drinks"];
  const [creationMode, setCreationMode] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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

  const onSave = async (newProductData) => {
    let imageUrl = newProductData.image;

    if (imageFile) {
      imageUrl = await handleUpload();
      newProductData.image = imageUrl; 
    }

    actions.createNewProduct(
      newProductData.name,
      newProductData.price,
      newProductData.description,
      imageUrl,
      newProductData.category
    );
      setTimeout( () => {
        setOpenModal(false)
      },800)
    // handleCloseModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(newProductData);
  };


  
  return (
    <> 
    {creationMode ? 
    <div className="modal-overlay">
        <div className="modal-content">
          <h2>Create Product</h2>
          <form method='POST' onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={newProductData.name || ''} onChange={handleChange}/>
            </label>
            <label>
              Price:
              <input type="text" name="price" value={newProductData.price || ''} onChange={handleChange} />
            </label>
            <label>
              Description:
              <textarea name="description" value={newProductData.description || ''} onChange={handleChange}></textarea>
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
            <button type="button" onClick={() => {handleCloseModal()}}>Cancel</button>
          </form>
        </div>
      </div> : "" }
    </>
  )
}

export default CreateProduct
