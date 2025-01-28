import React, { useState } from 'react';
import "../Styles/LoginSignup.css";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const togglePanel = () => {
        setIsSignUp(prevIsSignUp => !prevIsSignUp);
    };
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("Male");
    const [email1, setEmail1] = useState("");
    const [password1, setPassword1] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [signUpStatus, setSignUpStatus] = useState("");

    const register = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/register", {
            email: email,
            name: name,
            mobile: mobile,
            gender: gender,
            password: password,
        })
        .then((response) => {
            if (response.data.message) {
                setSignUpStatus(response.data.message);
            } else {
                setSignUpStatus("Account Created Successfully!");
            }
        })
        .catch((error) => {
            console.error("Error during registration:", error);
            setSignUpStatus("Error occurred during registration.");
        });
    };

    const login = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/login", {
            email: email1,
            password: password1,
        })
        .then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus("Login successful!");
                navigate(`/sizebasedcalc?loginStatus=${response.data[0].email}`);
            }
        })
        .catch((error) => {
            console.error("Error during login:", error);
            setLoginStatus("An error occurred. Please try again later.");
        });
    };

    return (
        <>
            <nav id="navbar" className="navbar navbar-expand-lg navbar-dark pt-4">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href='/'><img className="rounded-circle" src='images/co2.png' height="44.8px" width="86.8" alt='logo'></img><span className='BrandName1'>EcoMine</span><span className='BrandName2'>Insight</span></a>
                </div>
            </nav>

            <div id="body" className='pt-5'>
                <div className={`containersnl ${isSignUp ? 'right-panel-active' : 'left-panel-active'}`}>
                    {/* Sign Up Form */}
                    <div className="form-container sign-up-container">
                        <form action="/" id='signupform' className='form'>
                            <h1>Create Account</h1>
                            <input type="text" placeholder="Name*" onChange={(e) => { setName(e.target.value) }} required className='ip' />
                            <input type="email" placeholder="Email*" onChange={(e) => { setEmail(e.target.value) }} required className='ip' />
                            <input type="text" placeholder="Mobile Number*" onChange={(e) => { setMobile(e.target.value) }} required className='ip' />
                            <div className="form-check form-check-inline d-flex align-items-evenly mt-2">
                                <input className="form-check-input me-2" onChange={(e) => setGender(e.target.value)} type="radio" name="gender" value="Male" checked />
                                <label className="form-check-label me-5">Male</label>
                                <input className="form-check-input me-2" onChange={(e) => setGender(e.target.value)} type="radio" name="gender" value="Female" />
                                <label className="form-check-label">Female</label>
                            </div>
                            <input type="password" placeholder="Password*" onChange={(e) => { setPassword(e.target.value) }} required className='ip' />
                            <button className="button m-2" onClick={register}>Sign Up</button>
                            <h5>{signUpStatus}</h5>
                        </form>
                    </div>

                    {/* Login Form */}
                    <div className="form-container sign-in-container">
                        <form action="/" className='form'>
                            <h1>Login</h1>
                            <input type="email" placeholder="Email*" onChange={(e) => { setEmail1(e.target.value) }} required className='ip' />
                            <input type="password" placeholder="Password*" onChange={(e) => { setPassword1(e.target.value) }} required className='ip' />
                            <a href="/" className='a'>Forgot your password?</a>
                            <button className="button" onClick={login}>Login</button>
                            <h5>{loginStatus}</h5>
                        </form>
                    </div>

                    {/* Overlay */}
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p className='mt-4'>To keep connected with us please login with your personal info</p>
                                <button className="button ghost mt-4" onClick={togglePanel}>
                                    {isSignUp ? 'Login' : 'Sign Up'}
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend, new here?</h1>
                                <p className='mt-4'>Enter your personal details and start the journey with us</p>
                                <button className="button ghost mt-4" onClick={togglePanel}>
                                    {isSignUp ? 'Login' : 'Sign Up'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginSignup;
