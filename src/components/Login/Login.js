import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
// import firebase from 'firebase/app'
// import firebase from '@firebase/app'
import firebase from 'firebase'
import firebaseConfig from '../../firebase.config';
import SignUpForm from './SignUpForm';
// import LoginForm from './LoginForm';
import LoginWithOthers from '../LoginWithOthers/LoginWithOthers';
// import { userContext } from '../../App';
// import  UserContext from '../../App';
import './Login.css'
import { userContext } from '../../App';
import LoginForm from './LoginForm';
import logo from '../../Images/logo2.png'




const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    
    const [currentUser, setCurrentUser] = useState({
        isSignedIn: false,
        email: "",
        password: "",
        erros: "",
        success: false,

    })

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const handleFormToggle = () => {
        setNewUser(!newUser);
    }

    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }

     const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
      const {displayName, email} = result.user;
      const newUser = {
          isSignedIn: true,
          email: email,
          name: displayName
      }
      setCurrentUser(newUser);
      setLoggedInUser(newUser);
      history.replace(from);
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

    }

     const handleFacebookSignIn = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName, email} = result.user;

    const newUser = {
        isSignedIn: true,
        email: email,
        name: displayName
    }
    setCurrentUser(newUser);
    setLoggedInUser(newUser);
    history.replace(from);
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });

}
  const handleAppleSignIn = () => {
    var provider = new firebase.auth.OAuthProvider('apple.com');
    firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName, email} = result.user;
    const newUser = {
        isSignedIn: true,
        email: email,
        name: displayName
        }

        setCurrentUser(newUser);
        setLoggedInUser(newUser);
        history.replace(from);

    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // You can also get the Apple OAuth Access and ID Tokens.
    var accessToken = credential.accessToken;
    var idToken = credential.idToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });

  }
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
});
let pass1, pass2;
const handleFormValidation = (e) => {
    let isFieldValid = true;
    const newError = { ...errors };

    if (e.target.name === "name") {
        isFieldValid = e.target.value.length > 2;
        if (!isFieldValid) {
            newError[e.target.name] = "Name is not valid";
            setErrors(newError);
        } else {
            newError[e.target.name] = "";
            setErrors(newError);
        }
    }

    if (e.target.name === "email") {
        isFieldValid = /\S+@\S+/.test(e.target.value);
        if (!isFieldValid) {
            newError[e.target.name] = "Email is not valid";
            setErrors(newError);
        } else {
            newError[e.target.name] = "";
            setErrors(newError);
        }
    }

    if (e.target.name === "password" || e.target.name === "confirmPassword") {
        const isPasswordLengthValid = e.target.value.length > 5;
        const passwordHasNumber = /\d{1}/.test(e.target.value);

        isFieldValid = isPasswordLengthValid && passwordHasNumber;

        if (e.target.name === "password") {
            pass1 = e.target.value;
            if (!isFieldValid) {
                newError[e.target.name] = "Password is not valid";
                setErrors(newError);
            } else {
                newError[e.target.name] = "";
                setErrors(newError);
            }
        }
        if (e.target.name === "confirmPassword") {
            pass2 = e.target.value;
            if (!isFieldValid && pass1 !== pass2) {
                newError[e.target.name] = "Password is not matched";
                setErrors(newError);
            } else {
                newError[e.target.name] = "";
                setErrors(newError);
            }
        }
    }

    if (isFieldValid) {
        const newUser = { ...currentUser };
        newUser[e.target.name] = e.target.value;
        setCurrentUser(newUser);
        // console.log("is valid -> ", isFieldValid, currentUser);
    }
};
const handleCreateNewUser = (e) => {
    e.preventDefault();
    if (!currentUser.email && !currentUser.password) {
        const newError = { ...errors };
        newError.name = "Please use valid name!";
        newError.email = "Please use valid email!";
        newError.password = "Please use valid password!";
        newError.confirmPassword = "Please is not matched!";
        setErrors(newError);
    } else {
        firebase
            .auth()
            .createUserWithEmailAndPassword(currentUser.email, currentUser.password)
            .then((result) => {
                const { displayName, email } = result.user;
                const newUser = {
                    email: email,
                    name: displayName,
                    success: true,
                    error: "",
                };
                setCurrentUser(newUser);

                setLoggedInUser(newUser);
                console.log(result.user);
            })
            .catch((error) => {
                const newUser = { ...currentUser };
                newUser.error = error.message;
                newUser.success = false;
                setLoggedInUser(newUser);
                console.log(error.message);
            });
    }
};

/* SIGN IN with email and password */
const handleSignIn = (e) => {
    e.preventDefault();
    if (!currentUser.email && !currentUser.password) {
        const newError = { ...errors };
        newError.email = "Please use valid email!";
        newError.password = "Please use valid password!";
        setErrors(newError);
    } else {
        firebase
            .auth()
            .signInWithEmailAndPassword(currentUser.email, currentUser.password)
            .then((result) => {
                const { displayName, email } = result.user;
                const newUser = {
                    isSignedIn: true,
                    email: email,
                    name: displayName,
                    success: true,
                    error: "",
                };
                setCurrentUser(newUser);

                setLoggedInUser(newUser);
                history.replace(from);
            })
            .catch((error) => {
                const newUser = { ...currentUser };
                newUser.error = error.message;
                newUser.success = false;
                setLoggedInUser(newUser);
            });
    }
};



    

    return (
        <section className="tg-signup-login text-center">
			<div className="container">
                <div className="col-md-12 logo-img text-center">
                    <img src={logo} alt="" />
                </div>
				{currentUser.success && (
					<div className="alert alert-success" role="alert">
						User {!newUser ? "logged in" : "registered"} successfully
					</div>
				)}
				{loggedInUser.error && (
					<div className="alert alert-danger" role="alert">
						{loggedInUser.error}
					</div>
				)}
				{newUser ? (
					<SignUpForm
						toggleUser={handleFormToggle}
						validation={handleFormValidation}
						submit={handleCreateNewUser}
						errors={errors}
					></SignUpForm>
				) : (
					<LoginForm
						toggleUser={handleFormToggle}
						validation={handleFormValidation}
						submit={handleSignIn}
						errors={errors}
					></LoginForm>
				)}
				<LoginWithOthers google={handleGoogleSignIn} facebook={handleFacebookSignIn} apple={handleAppleSignIn}></LoginWithOthers>
			</div>
		</section>
    );
};

export default Login;

