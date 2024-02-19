import React, { useRef, useState } from "react";
import Header from "./Header";
import checkValidData from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useNavigate } from "react-router-dom";
import {updateProfile} from 'firebase/auth'
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        // Validate the form data
        const message = checkValidData(
            email.current.value,
            password.current.value
        );
        setErrorMessage(message);

        if (message) {
            return;
        }

        if (!isSignInForm) {
            // Sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/64033458?s=400&u=9e7215b01ff78bf837b032d360f40341439604a7&v=4"
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(
                            addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName,
                                photoURL: photoURL,
                            })
                        );
                        navigate("/browse");
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "- " + errorMessage);
                });
        } else {
            // Sign In logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "- " + errorMessage);
                });
        }
    };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_small.jpg" />
            </div>

            <form
                className="w-3/12 absolute p-12 bg-black mt-44 mx-auto right-0 left-0 bg-opacity-75 "
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <h1 className="font-semibold text-white text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>

                {!isSignInForm && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className="p-4 my-4 w-full bg-[#333] rounded-md text-white"
                    />
                )}

                <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    className="p-4 my-4 w-full bg-[#333] rounded-md text-white"
                />

                <input
                    ref={password}
                    type="password"
                    placeholder="Enter Your Password"
                    className="p-4 my-4 w-full bg-[#333] rounded-md text-white"
                />

                <p className="text-red-500 py-2 px-1 text-lg">{errorMessage}</p>

                <button
                    className="p-4 my-6 bg-red-600 text-white w-full rounded-md"
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <div className="text-[#989898] py-4 flex">
                    {isSignInForm ? "New to Netflix ?" : "Already registered ?"}
                    <div
                        className="text-white px-2 cursor-pointer"
                        onClick={toggleSignInForm}
                    >
                        {isSignInForm ? "Sign Up Now." : "Sign In Now."}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
