import React, { useContext, useState } from 'react';
import logo from '../../Images/logo2.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


import './Header.css'
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../../App';
const Header = (props) => {
    // const [cart, setCart] = useState([]);
    console.log(props, "tusarb");
    const history = useHistory();
	const handleLoginRoute = () => {
		history.push("/user");
	};

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <nav className="navbar navbar-expand navbar-light bg-white fixed-top">
            <div className="container">
                <div className="navbar-brand">

            <img src={logo} alt=""/>
                </div>
                <Link to="/checkout">
                <ul className="navbar-nav cart-icon">
                    <li className="nav-item"><FontAwesomeIcon className="cart-icon" icon={faCartArrowDown} /><span className="badge bg-light">{props.cart.length}</span></li>
                    </ul>
                </Link>
                    {loggedInUser.isSignedIn ? 
							<button className="btn btn-rounded btn-danger ">Sign out</button>
						 : 

                         <div className="main-btn">
                             <button className="btn  tg-primary login-btn" onClick={handleLoginRoute}>
								Login
							</button>
                             <button className="btn btn-rounded btn-danger sign-up-btn" onClick={handleLoginRoute}>Sign Up</button>

							
                         </div>
                            
						}

						{loggedInUser.isSignedIn && (
							<div className="user-icon">
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
								{loggedInUser.name ? loggedInUser.name.split(" ") : "User"}{" "}
								
							</div>
						)} 
                
            </div>

        </nav>
    );
};

export default Header;