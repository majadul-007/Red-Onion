import React, { useEffect, useState } from 'react';
import PreLoader from '../PreLoader/PreLoader';
import SingleFeature from '../SingleFeature/SingleFeature';

const Features = () => {

    const [features, setFeatures] = useState([]);
    const [preloaderVisibility, setPreloaderVisibility] = useState('block')

    useEffect(()=> {
        fetch('https://red-onion-backend.herokuapp.com/features')
        .then(res => res.json())
        .then(data => {
            setFeatures(data);
            setPreloaderVisibility("none");

        })
    }, [])
        


    return (
        <section className="features my-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="col-md-6">
                            <h2>Why you choose us</h2>
                            <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aliquid, minus, neque odio perferendis reiciendis rerum explicabo quibusdam. </p>

                        </div>
                    </div>
                    <PreLoader visibility={preloaderVisibility} />
                    {
                        features.map(feature => <SingleFeature key ={feature.id} feature={feature}></SingleFeature>)
                    }
                </div>
            </div>

        </section>
    );
};


        

export default Features;