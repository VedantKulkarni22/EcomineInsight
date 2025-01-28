import React, { useState, useEffect } from 'react';
import { FaTree, FaIndustry, FaCog } from "react-icons/fa";
import { IoMdWarning } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Navbar from './Navbar';
import axios from 'axios';  // Import axios
import '../Styles/LandingPage.css';


const MachineryBasedCalc = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    // Retrieve query parameters
    const totalCarbonFootprint = parseFloat(searchParams.get('totalCarbonFootprint')) || 0;
    const loginStatus = searchParams.get('loginStatus');
    
    const [fuel, setFuel] = useState('');
    const [hours, setHours] = useState('');
    const [machinery, setMachinery] = useState('Excavator');
    const [carbonFootprint, setCarbonFootprint] = useState(0);
    const [result, setResult] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const calculateFootprint = () => {
            const fuelValue = parseFloat(fuel);
            const hoursValue = parseFloat(hours);

            if (isNaN(fuelValue) || isNaN(hoursValue)) {
                setErrors({
                    fuel: isNaN(fuelValue) ? "Fuel consumption is required" : '',
                    hours: isNaN(hoursValue) ? "Operating hours are required" : ''
                });
                return;
            } else {
                setErrors({});
            }

            let emissionFactor;
            switch (machinery) {
                case "Excavator":
                    emissionFactor = 2.7;
                    break;
                case "Bulldozer":
                    emissionFactor = 3.1;
                    break;
                case "Dump Truck":
                    emissionFactor = 3.5;
                    break;
                case "Drill":
                    emissionFactor = 2.0;
                    break;
                default:
                    emissionFactor = 2.7;
            }

            const calculatedFootprint = fuelValue * hoursValue * emissionFactor;
            setCarbonFootprint(calculatedFootprint);
            setResult(calculatedFootprint.toFixed(2));
        };

        // Only run calculation if both fuel and hours are provided
        if (fuel && hours) {
            calculateFootprint();
        }
    }, [fuel, hours, machinery]);

    const handleLogout = () => {
        navigate(`/loginsignup?loginStatus=${null}`);
      };

      const handleProfile = () => {
        navigate(`/profile?loginStatus=${loginStatus}`);
      };

    // Function to validate the form inputs
    const validateForm = () => {
        const newErrors = {};
        if (!fuel) newErrors.fuel = "Fuel consumption is required";
        if (!hours) newErrors.hours = "Operating hours are required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Store the footprint in history
                const response = await axios.post("http://localhost:3001/cfhistorystored", {
                    email: loginStatus,
                    calculatedValue: carbonFootprint,
                    calculationType: 'machinery', // Type for this calculator
                });
    
                if (response.status === 200) {
                    console.log("Carbon footprint stored successfully!");
                } else {
                    console.error("Failed to store carbon footprint.");
                }

                const newTotalCarbonFootprint = parseFloat(totalCarbonFootprint) + parseFloat(carbonFootprint);
                navigate(`/transportbasedcalc?totalCarbonFootprint=${newTotalCarbonFootprint}&loginStatus=${loginStatus}`);
            } catch (error) {
                console.error("Error occurred while storing carbon footprint:", error);
            }
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark pt-4" style={{ background: 'linear-gradient(to right, #2d3748, #2f855a)' }}>
      <div className="container-fluid">
        <a className="navbar-brand fw-bold fs-2" href={`/sizebasedcalc?loginStatus=${loginStatus}`}>
          <img
            className="rounded-circle"
            src="images/co2.png"
            height="44.8px"
            width="86.8"
            alt="logo"
          ></img>
          <span className="BrandName1">EcoMine</span>
          <span className="BrandName2">Insight</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
                    <a className="nav-link fs-6 rounded-3 m-1" href={`/history?loginStatus=${loginStatus}`}>History</a>
                </li>
        </ul>
        <ul className="navbar-nav ms-auto mb-lg-0">
          <li className="nav-item">
                        <button type="button" onClick={handleProfile} className="opt btn btn-outline-dark m-2">Profile</button>
                </li>
                <li className="nav-item">
                        <button type="button" onClick={handleLogout} className="opt btn btn-outline-dark m-2">LogOut</button>
                </li>
        </ul>
      </div>
      <div></div>
    </nav>
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4" style={{ background: 'linear-gradient(to right, #2d3748, #2f855a)' }}>
                <h2 className="text-3xl font-bold mb-4 d-flex align-items-center text-white">
                    <img src="images/coalmine.png" height="40px" width="40px"className="me-3"/> Carbon Footprint Calculator <img src="images/leaf.png" height="40px" width="40px"className="ms-3"/>
                </h2>
                <div className="card w-50 max-w-4xl border-0 shadow-lg">
                    <div className="row no-gutters">
                        <div className="col-md-12 text-white p-4" style={{ background: '#0D1321' }}>
                            <h3 className="text-3xl font-bold mb-4 d-flex align-items-center text-white">
                                <img src="images/drill.png" height="35px" width="35px" className='me-2'/> Machinery Based Calculator <img src="images/drill.png" height="35px" width="35px" className='ms-2'/>
                            </h3>
                            <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="fuel">Fuel Consumption (liters):</label>
                                    <input
                                        type="number"
                                        id="fuel"
                                        className="form-control"
                                        value={fuel}
                                        onChange={(e) => setFuel(e.target.value)}
                                        placeholder="Enter fuel consumption"
                                    />
                                    {errors.fuel && (
                                        <div className="text-danger small mt-1 d-flex align-items-center">
                                            <IoMdWarning className="mr-1" /> {errors.fuel}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="hours">Operating Hours:</label>
                                    <input
                                        type="number"
                                        id="hours"
                                        className="form-control"
                                        value={hours}
                                        onChange={(e) => setHours(e.target.value)}
                                        placeholder="Enter operating hours"
                                    />
                                    {errors.hours && (
                                        <div className="text-danger small mt-1 d-flex align-items-center">
                                            <IoMdWarning className="mr-1" /> {errors.hours}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="machinery">Machinery Type:</label>
                                    <select
                                        id="machinery"
                                        className="form-control"
                                        value={machinery}
                                        onChange={(e) => setMachinery(e.target.value)}
                                    >
                                        <option value="Excavator">Excavator</option>
                                        <option value="Bulldozer">Bulldozer</option>
                                        <option value="Dump Truck">Dump Truck</option>
                                        <option value="Drill">Drill</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-light btn-block mt-4"
                                    style={{ background: '#55E91F', border: 'none' }}
                                >
                                    <FaCog className="mr-2 spin" /> Calculate
                                </button>
                            </form>

                            <h2 className="text-success d-flex align-items-center m-3">
                                <FaTree className="mr-2" /> Results
                            </h2>
                            <div className="card p-4 mb-4 text-dark">
                                <h3 className="h5 mb-3">Carbon Footprint Results</h3>
                                <div className="mb-3">
                                    <p className="mb-1">Estimated Carbon Footprint:</p>
                                    <h4 className="text-danger">{result} tons CO<sub>2</sub></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MachineryBasedCalc;
