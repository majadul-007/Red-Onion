import React from 'react';
import loader from '../../Images/ICON/preloader.gif'
const PreLoader = (props) => {
    return (
        <div className="text-center col-12 " style={{display: props.visibility}}>
            <img src={loader} alt=""/>

        </div>
    );
};

export default PreLoader;