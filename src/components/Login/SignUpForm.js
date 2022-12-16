
import React from 'react';

const SignUpForm = (props) => {
    const {toggleUser, validation, submit, errors} = props;
    
    return (
        <div className="tg-form login signup">
			<h3>Create an account</h3>

			<form onSubmit={submit}>
				<div className="form-group"> 
					<input
						type="text"
						className="form-control"
						placeholder="Your Name"
						name="name"
						onBlur={validation}
					/>
					{errors.name.length > 0 && <p className="error-msg">{errors.name}</p>}
				</div>

				<div className="form-group">
					<input type="email" className="form-control" placeholder="Email" name="email" onBlur={validation} />
					{errors.email.length > 0 && <p className="error-msg">{errors.email}</p>}
				</div>

				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="Password"
						name="password"
						onBlur={validation}
					/>
					{errors.password.length > 0 && <p className="error-msg">{errors.password}</p>}
				</div>

				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="Confirm Password"
						name="confirmPassword"
						onBlur={validation}
					/>
					{errors.confirmPassword.length > 0 && <p className="error-msg">{errors.confirmPassword}</p>}
				</div>

				<button type="submit" className="btn btn-warning tg-primary btn-block">
					Create an account
				</button>
			</form>

			<div className="register-login">
				Already have an account?{" "}
				<button className="btn btn-logintoggle" onClick={toggleUser}>
					Login
				</button>
			</div>
		</div>
    );
};

export default SignUpForm;


















// import React, { useState } from "react";
// // import { useAuth } from "./useAuth";
// import { useForm } from "react-hook-form";
// import logo from "../../Images/logo2.png";
// import "./SignUp.css";
// import { useAuth } from "./useAuth";
// // import { useAuth } from "./useAuth";
// // import {} './useAuth'


// const SignUp = () => {
//   const [returningUser, setReturningUser] = useState(false);
//   const { register, handleSubmit, watch, errors } = useForm();

//   const auth = useAuth;
  
//   console.log(auth);

//   const onSubmit = (data) => {
//     console.log(data, 'hello');
//     if (returningUser) {
//       if (data.email && data.password) {
//         auth.signIn(data.email, data.password);
//       }
//     } else {
//       if (data.name && data.email && data.password) {
//         console.log('nashir')
//         auth.signUp(data.email, data.password, data.name);
//       }
//     }
//   };

//   return (
//     <div className="sign-up">
//       <div className="container">
//         <div className="logo-container ">
//           <img src={logo} alt="" />
//         </div>
//         {returningUser ? (
//           <form onSubmit={handleSubmit(onSubmit)} action="" className="py-5">
//             {auth && auth.user != null && (
//               <p className="text-danger">{auth.user.error}</p>
//             )}
//             <div className="form-group">
//               <input
//                 name="email"
//                 className="form-control"
//                 {...register("email", { requried: true })}
//                 placeholder="Email"
//               />
//               {errors && errors.email && (
//                 <span className="error">Email is Required</span>
//               )}
//             </div>
//             <div className="form-group">
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 {...register("password", { requried: true })}
//                 placeholder="password"
//               />
//               {errors && errors.password && (
//                 <span className="error">Password is Required</span>
//               )}
//             </div>
//             <div className="form-group">
//               <button className="btn btn-danger">Sign In</button>
//             </div>
//             <div className="option text-center">
//               <label onClick={() => setReturningUser(false)}>
//                 Create a new Account
//               </label>
//             </div>
//           </form>
//         ) : (
//           <form action="" onSubmit={handleSubmit(onSubmit)}>
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control"
//                 {...register("name", { requried: true })}
//                 placeholder="Name"
//               />
//               {errors && errors.name && (
//                 <span className="error">Name is Required</span>
//               )}
//             </div>
//             <div className="form-group">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 {...register("email", { required: true })}
//                 placeholder="Email"
//               />
//               {errors && errors.email && (
//                 <span className="error">Email is required</span>
//               )}
//             </div>
//             <div className="form-group">
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 {...register("password", { requried: true })}
//                 placeholder="Password"
//               />
//               {errors && errors.password && (
//                 <span className="error">Password is Required</span>
//               )}
//             </div>
//             <div className="form-group">
//               <button className="btn btn-danger" type="submit">
//                 Sign Up
//               </button>
//             </div>
//             <div className="option text-center">
//               <label onClick={() => setReturningUser(true)}>
//                 Already have an account!
//               </label>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SignUp;
