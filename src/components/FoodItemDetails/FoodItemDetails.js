import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// import { useParams } from "react-router";
// import PreLoader from "../PreLoader/PreLoader";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faCheckCircle } from '@fortawesome/free-solid-svg-icons' 
import PreLoader from "../PreLoader/PreLoader";


const FoodItemDetails = (props) => {
  // const {name,shortDescription,price,images} = props.food;

  console.log(props, "nashir")
  const [currentFood, setCurrentFood] = useState({});
  const {id} = useParams();
  console.log(id);
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedBigImage, setSelectedBigImage] = useState(null);
  const [preloaderVisibility, setPreloaderVisibility] = useState("block");
  // const [quantity, setQuantity] = useState(1);
  

  

  useEffect(() => {
    fetch("https://red-onion-backend.herokuapp.com/food/" + id)
      .then((res) => res.json())
      .then((data) => {
        setCurrentFood(data);
        setPreloaderVisibility("none");
      })
      .catch((err) => console.log(err));
    if (currentFood.images) {
      setSelectedBigImage(currentFood.images[0]);
    }
    window.scrollTo(0, 0);
  }, [currentFood.name]);
  const finalCartHandler = (currentFood) => {
    currentFood.quantity = quantity;
    console.log(currentFood, 'food man');
    props.cartHandler(currentFood)
    setIsSuccess(true);
    console.log(isSuccess, "what");
  }
  if(isSuccess){
    setTimeout(() => {

      setIsSuccess(false)
      console.log(isSuccess);
    }, 1500);
  }

  return (
    <div className="food-details container my-5">
      <PreLoader visibility={preloaderVisibility}></PreLoader>
      {currentFood.name && (
        <div className="row">
          <div className="col-md-6 my-5">
            <h1>{currentFood.name}</h1>
            <p className="my-5">{currentFood.fullDescription}</p>
            <div className="d-flex my-4">
              <h2>${currentFood.price.toFixed(2)}</h2>
              <div className="cart-controller ml-3">
                <button
                  className="btn"
                  onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
                >
                  -
                </button>
                <button
                  className="btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="action d-flex align-items-center">
                <button className="btn btn-danger btn-rounded" onClick={() => finalCartHandler(currentFood)}><FontAwesomeIcon  icon={faCartArrowDown} /> Add</button>
            </div>
            <div className="more-images mt-5">
              {currentFood.images.map((img, index) => (
                <img
                  onClick={() => setSelectedBigImage(currentFood.images[index])}
                  className={
                    currentFood.images[index] === selectedBigImage
                      ? "mr-4 small-img active-small-img"
                      : "mr-4 small-img"
                  }
                  height="150px"
                  src={img}
                  alt=""
                />
              ))}
            </div>
          </div>
          <div className="col-md-6 my-5">
            <img src={selectedBigImage} className="img-fluid" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItemDetails;
