import React, { useState } from 'react';
import './Banner.css';
// import { Button } from 'react-bootstrap';


const Banner = () => {
    const [searchQuery, setQuery] = useState([])
    const getQuery = e => setQuery(e.target.value);
    return (
        <section className="banner d-flex align-items-center text-center">


        <div className="container">
            <h1>Best food waiting for your belly</h1>
            <div className="search-box col-md-6 my-5 mx-auto">
                <input type="text" onChange={getQuery} className="form-control" placeholder="Search your food here"/>
                <button  onClick={() => window.scrollBy(0, 500)} className='btn btn-danger search-btn btn-rounded'>Search</button>
  

            </div>
            
        </div>
        </section>
    );
};

export default Banner;