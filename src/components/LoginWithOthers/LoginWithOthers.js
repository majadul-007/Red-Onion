import React from 'react';
import facebook from '../../Images/ICON/fb.png'
import google from '../../Images/ICON/google.png';
import apple from '../../Images/ICON/Apple.png'

const LoginWithOthers = (props) => {
    return (
        <div>
        <div className="form-divider text-center">
            <p>Or</p>
        </div>

        <div className="tg-thirdparty-login">
            {/* <button className="btn btn-secondary" onClick={props.facebook}>
                <span>
                    <img src={facebook} style={{ maxWidth: "35px" }} alt="fb logo" />
                </span>
                <span>Continue with Facebook</span>
            </button> */}
            <button className="btn btn-secondary" onClick={props.google}>
                <span>
                    <img src={google} style={{ maxWidth: "32px" }} alt="google logo" />
                </span>
                <span>Continue with Google</span>
            </button>
            <button className="btn btn-secondary" onClick={props.google}>
                <span>
                    <img src={apple} style={{ maxWidth: "32px" }} alt="fb logo" />
                </span>
                <span>Continue with Apple</span>
            </button>
        </div>
    </div>
    );
};

export default LoginWithOthers;