import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_small.jpg" />
            </div>
            
            <form className="w-3/12 absolute p-12 bg-black my-24 mx-auto right-0 left-0 bg-opacity-75">
                <h1 className="font-semibold text-white text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>

                {!isSignInForm && (<input
                    type="text"
                    placeholder="Full Name"
                    className="p-4 my-4 w-full bg-[#333] rounded-md"
                />)}

                <input
                    type="text"
                    placeholder="Email Address"
                    className="p-4 my-4 w-full bg-[#333] rounded-md"
                />

                <input
                    type="password"
                    placeholder="Enter Your Password"
                    className="p-4 my-4 w-full bg-[#333] rounded-md"
                />

                <button className="p-4 my-6 bg-red-600 text-white w-full rounded-md">
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
