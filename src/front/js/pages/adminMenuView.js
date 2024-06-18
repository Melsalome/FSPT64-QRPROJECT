import React, { useContext, useEffect, useState } from 'react'
import "../../styles/adminMenuView.css"
import CategoriesButton from '../component/categoriesButton';
import ProductsCard from '../component/ProductsCard';
import EditMenuModal from '../component/EditMenuModal';
import { Context } from '../store/appContext';
import CreateProduct from '../component/CreateProduct';


  const adminMenuView = () => {
    const {store, actions} = useContext(Context)
   
    const categoryName = ["All", "Starters", "Mains", "Desserts", "Drinks"];
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredItems, setFilteredItems] = useState([]);
    const [productId, setProductId] = useState("")
    const [openModal, setOpenModal] = useState(false)
    
      const handleCloseModal = () => {
        setOpenModal(false)
      }

    // console.log(filteredItems)
  
    const fetchProduct = async() => {
    const products =  await actions.getProduct()
    setFilteredItems(products)
    }


    useEffect( () => {
    fetchProduct()
  
    },[openModal])
  
    const handleDeleteProduct = async (id) => {
      await actions.deleteProduct(id);
      const updatedProducts = filteredItems.filter(product => product.id !== id);
      setFilteredItems(updatedProducts);
    };
    
  return (
    <div>
      <div className="menu-container">
        <CategoriesButton categoryName={categoryName} setSelectedCategory={setSelectedCategory} setOpenModal={setOpenModal} selectedCategory={selectedCategory}/>
        <div className='menu-items'>
          {selectedCategory === "All" ?  <ProductsCard menuItems={filteredItems} setProductId={setProductId}/> : <ProductsCard menuItems={filteredItems.filter(product => product.category === selectedCategory)} setProductId={setProductId} onDeleteProduct={handleDeleteProduct}/>} 
        </div>
        <div className='editModalMenu'>
     {productId === "" ? <></> : <EditMenuModal filteredItems={filteredItems} productId={productId} setProductId={setProductId} /> }
     { openModal ? <CreateProduct handleCloseModal={handleCloseModal} /> : <></> }
        </div>
      </div>
    </div>
  );
}


    
export default adminMenuView
