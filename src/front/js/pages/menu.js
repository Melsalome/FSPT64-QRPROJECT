import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { Context } from "../store/appContext";
import "../../styles/menu.css";
import { AddForm } from "../component/AddForm";
const MenuItem = ({ meal }) => (
	<li className='meal'>
		<img src={meal.image} alt={meal.name} className='meal-image' />
		<div className='meal-items'>
			<h5>{meal.name}</h5>
			<div className='price'>${meal.price}</div>
		</div>
		<div className='description'>{meal.description}</div>
		<AddForm
			id={meal.id}
			name={meal.name}
			price={meal.price}
		/>
	</li>
);
const MenuCategory = ({ category, meals, collapseOthers, isCollapsed }) => {
	const toggleCollapsed = () => {
		collapseOthers(category);
	};
	return (
		<div className="menu-category">
			<h2 onClick={toggleCollapsed} className={`category-title ${isCollapsed ? 'collapsed' : 'expanded'}`}>
				{category}
				<span className={`arrow ${isCollapsed ? 'down' : 'up'}`}>▼</span>
			</h2>
			{!isCollapsed && (
				<ul>{meals.map((meal) => <MenuItem key={meal.id} meal={meal} />)}</ul>
			)}
		</div>
	);
};
export const Menu = () => {
	const { store, actions } = useContext(Context);
	const { restaurantId, tableId } = useParams();
	useEffect(() => {
		actions.getMenu(restaurantId, tableId);
	}, [restaurantId, tableId]);
	const [collapsedCategories, setCollapsedCategories] = useState([]);
	const collapseOthers = (category) => {
		if (collapsedCategories.includes(category)) {
			setCollapsedCategories(collapsedCategories.filter(cat => cat !== category));
		} else {
			setCollapsedCategories([category]);
		}
	};
	const starters = store.menu.filter(item => item.category === 'starter');
	const mains = store.menu.filter(item => item.category === 'main');
	const desserts = store.menu.filter(item => item.category === 'dessert');
	const drinks = store.menu.filter(item => item.category === 'drink');
	return (
		<>
			<Navbar />
			<div className='meals'>
				<div className='card'>
					<MenuCategory category="Starters" meals={starters} collapseOthers={collapseOthers}
						isCollapsed={!collapsedCategories.includes("Starters")} />
					<MenuCategory category="Main Course" meals={mains} collapseOthers={collapseOthers}
						isCollapsed={!collapsedCategories.includes("Main Course")} />
					<MenuCategory category="Desserts" meals={desserts} collapseOthers={collapseOthers}
						isCollapsed={!collapsedCategories.includes("Desserts")} />
					<MenuCategory category="Drinks" meals={drinks} collapseOthers={collapseOthers}
						isCollapsed={!collapsedCategories.includes("Drinks")} />
				</div>
			</div>
			<Footer />
		</>
	);
};