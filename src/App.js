import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Banner from './components/Banner/Banner';
import Header from './components/Header/Header';
import Foods from './components/Foods/Foods';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
// import SIgnUp from './components/SignUp/SIgnUp';
import NotFound from './components/NotFound/NotFound';

import FoodItemDetails from './components/FoodItemDetails/FoodItemDetails'
import { createContext, useContext, useState } from 'react';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Shipment from './components/Shipment/Shipment';
import OrderComplete from './components/OrderComplete/OrderComplete';


export const userContext = createContext();

function App() {

  const [cart , setCart] = useState([]);
  const [orderId , setOrderId] = useState(null);
  
  const [deliveryDetails , setDeliveryDetails] = useState({
    todoor:null,road:null, flat:null, businessname:null, address: null
  });

  const [userEmail, setUserEmail] = useState(null);
  const deliveryDetailsHandler = (data) => {
      setDeliveryDetails(data)
  }
  const getUserEmail = (email) => {
    setUserEmail(email);
  }

  const clearCart =  () => {
    const orderedItems = cart.map(cartItem => {
      return {food_id : cartItem.id, quantity: cartItem.quantity}
    })

    const orderDetailsData = { userEmail , orderedItems,  deliveryDetails }
    fetch('https://red-onion-backend.herokuapp.com/submitorder' , {
        method : "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body : JSON.stringify(orderDetailsData)
    })
    .then(res => res.json())
    .then(data=> setOrderId(data._id))
    console.log(orderId);

    setCart([])
  }

  const cartHandler = (data) => {
    const alreadyAdded = cart.find(crt => crt.id == data.id );
    const newCart = [...cart,data]
    setCart(newCart);
    if(alreadyAdded){
      const reamingCarts = cart.filter(crt => cart.id != data);
      setCart(reamingCarts);
    }else{
      const newCart = [...cart,data]
      setCart(newCart);
    }
   
  }

  const checkOutItemHandler = (productId, productQuantity) => {
    const newCart = cart.map(item => {
      if(item.id == productId){
          item.quantity = productQuantity;
      }
      return item;
    })

    const filteredCart = newCart.filter(item => item.quantity > 0)
    setCart(filteredCart)
  }
 




  const [logggedInUser, setLoggedInUser] = useState({});
  const [signOutUser, setSignOutUser] = useState({});
  return (
    <userContext.Provider value={([logggedInUser, setLoggedInUser], [signOutUser, setSignOutUser])}>
         <Router>
    <div className="App">
    <Switch>
      <Route exact path="/">

      <Header cart={cart}></Header>
      <Banner></Banner>
      <Foods cart={cart}></Foods>
      <Features></Features>
      <Footer></Footer>
      </Route>
      <Route path="/user">
        <Login></Login>

      </Route>
      <Route path= "/food/:id">
        <Header cart={cart}></Header>
         
         
         {/* <FoodItemDetails cart={cart} cartHandler={cartHandler}></FoodItemDetails> */}
         <FoodItemDetails cart={cart} cartHandler={cartHandler}></FoodItemDetails>
         <Footer></Footer>

      </Route>
      <PrivateRoute path="/checkout">
        <Header cart={cart}></Header>
        <Shipment deliveryDetails={deliveryDetails} deliveryDetailsHandler={deliveryDetailsHandler} cart={cart} clearCart={clearCart} checkOutItemHandler={checkOutItemHandler} getUserEmail={getUserEmail}>

        </Shipment>
        <Footer></Footer>
      </PrivateRoute>
      <PrivateRoute>
        <Header cart={cart}></Header>
        <OrderComplete deliveryDetails={deliveryDetails} orderId={orderId}></OrderComplete>
      </PrivateRoute>
      
      <Route path ="*">
        <NotFound></NotFound>
      </Route>

    </Switch>
    </div>
    </Router>
     </userContext.Provider>
 
  );
}

export default App;
 