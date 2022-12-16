import React, { useEffect, useState } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import PreLoader from '../PreLoader/PreLoader';
// import {Link} from 'react-router-dom';

import './Foods.css'

const Foods = (props) => {
    const [foods, setFoods] = useState([]);
    const [selectedFoodTypes, setSelectedFoodTypes] = useState("Breakfast");
    const [preloaderVisibility, setPreloaderVisibility] = useState("block");


        useEffect(() => {
        fetch('https://red-onion-backend.herokuapp.com/foods')
        .then(res => res.json())
        .then(data => {
            setFoods(data);
            setPreloaderVisibility("none");
        })
    }, [foods.length]);

    const selectedFoods = foods.filter(food => food.type == selectedFoodTypes); 

    return (
        <section className="food-area my-5">
            <div className="container">
                <nav>
                    <ul className="nav justify-content-center">
                        <li onClick={() => setSelectedFoodTypes('Breakfast')} className="nav-item"><span to='breakfast' className={selectedFoodTypes === 'BreakFast' ?"active nav-link" : "nav-link"}>BreakFast</span>

                        </li>
                        <li onClick={() =>setSelectedFoodTypes('Lunch')} className="nav-item"><span to='lunch' className={selectedFoodTypes === 'Lunch'?"active nav-link" : "nav-link"}>Lunch</span></li>
                        <li onClick={() =>setSelectedFoodTypes('Dinner')} className="nav-item"> <span to='dinner' className={selectedFoodTypes === 'Dinner'?"active nav-link" : "nav-link"}>Dinner</span></li>

                    </ul> 
                </nav>
                <div className="row my-5">
                    <PreLoader visibility={preloaderVisibility} />
                        
                    {
                        selectedFoods.map(food => <FoodItem key={food.id} food={food}></FoodItem>)
                    }

                </div>
                <div className="text-center">
                    <button className="btn btn-rounded btn-danger">Checkout Your Food</button>
                </div>


            </div>

        </section>
        
    );
};

export default Foods;