import React, { useState, useEffect } from "react";
import { FaCog, FaIndustry, FaTree } from "react-icons/fa";
import { IoMdWarning } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Navbar from '../Components/Navbar';
import '../Styles/LandingPage.css';
import axios from 'axios';  // Import axios


const TransportBasedCalc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
    // Retrieve query parameters
    const totalCarbonFootprint = searchParams.get('totalCarbonFootprint');
    const loginStatus = searchParams.get('loginStatus');
  // const { totalCarbonFootprint = 0, loginStatus = "false" } = location.state || {};  
  const [distance, setDistance] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [fuelConsumed, setFuelConsumed] = useState("");
  const [carbonEmission, setCarbonEmission] = useState(0);
  const [errors, setErrors] = useState({});

  // useEffect to calculate carbon emission whenever relevant state changes
  useEffect(() => {
    const calculateCarbon = () => {
      const distanceValue = parseFloat(distance);
      const fuelEfficiencyValue = parseFloat(fuelEfficiency);
      const fuelConsumedValue = parseFloat(fuelConsumed);

      if (!isNaN(fuelConsumedValue) && !isNaN(fuelEfficiencyValue) && fuelType) {
        let emissionFactor;
        if (fuelType === "diesel") {
          emissionFactor = 2.68; // kg CO2 per liter for diesel
        } else {
          emissionFactor = 2.31; // kg CO2 per liter for petrol
        }

        const carbonEmissionResult =
          (fuelConsumedValue * emissionFactor) / fuelEfficiencyValue * distanceValue;

        setCarbonEmission(carbonEmissionResult.toFixed(2));
      }
    };

    calculateCarbon();
  }, [distance, fuelEfficiency, fuelType, fuelConsumed]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        try {
            // Store the footprint in history
            const response = await axios.post("http://localhost:3001/cfhistorystored", {
                email: loginStatus,
                calculatedValue: carbonEmission,
                calculationType: 'transport', // Type for this calculator
            });

            if (response.status === 200) {
                console.log("Carbon footprint stored successfully!");
            } else {
                console.error("Failed to store carbon footprint.");
            }

            const newTotalCarbonFootprint = parseFloat(totalCarbonFootprint) + parseFloat(carbonEmission);
            navigate(`/analyse?totalCarbonFootprint=${newTotalCarbonFootprint}&loginStatus=${loginStatus}`);
        } catch (error) {
            console.error("Error occurred while storing carbon footprint:", error);
        }
    }
};

const handleLogout = () => {
  navigate(`/loginsignup?loginStatus=${null}`);
};

const handleProfile = () => {
  navigate(`/profile?loginStatus=${loginStatus}`);
};
  
  const validateForm = () => {
    const newErrors = {};
    if (!distance) newErrors.distance = "Distance is required";
    if (!fuelEfficiency) newErrors.fuelEfficiency = "Fuel efficiency is required";
    if (!fuelConsumed) newErrors.fuelConsumed = "Fuel consumed is required";
    if (!fuelType) newErrors.fuelType = "Fuel type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      <div
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4"
        style={{ background: 'linear-gradient(to right, #2d3748, #2f855a)' }}
      >
        <h2 className="text-3xl font-bold mb-4 d-flex align-items-center text-white">
                    <img src="images/coalmine.png" height="40px" width="40px"className="me-3"/> Carbon Footprint Calculator <img src="images/leaf.png" height="40px" width="40px"className="ms-3"/>
                </h2>
        <div className="card w-50 border-0 shadow-lg">
          <div className="row no-gutters">
            <div className="col-md-12 text-white p-4" style={{ background: "#0D1321" }}>
              <h2 className="text-3xl font-bold mb-4 d-flex align-items-center">
                <img src="images/dumptruck.png" height="35px" width="35px" className="me-2"/> Transport Based Calculator <img src="images/dumptruck.png" height="35px" width="35px" className="ms-2"/>
              </h2>
              <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="distance">Distance Travelled (in km):</label>
                  <input
                    type="number"
                    id="distance"
                    name="distance"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="form-control"
                    placeholder="Enter distance"
                  />
                  {errors.distance && (
                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <IoMdWarning className="mr-1" /> {errors.distance}
                    </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="fuelEfficiency">Fuel Efficiency (km per liter):</label>
                  <input
                    type="number"
                    id="fuelEfficiency"
                    name="fuelEfficiency"
                    value={fuelEfficiency}
                    onChange={(e) => setFuelEfficiency(e.target.value)}
                    className="form-control"
                    placeholder="Enter fuel efficiency"
                  />
                  {errors.fuelEfficiency && (
                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <IoMdWarning className="mr-1" /> {errors.fuelEfficiency}
                    </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="fuelType">Fuel Type:</label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="form-select form-select-sm"
                  >
                    <option value="">Select fuel type</option>
                    <option value="diesel">Diesel (2.68 kg CO₂ per liter)</option>
                    <option value="petrol">Petrol (2.31 kg CO₂ per liter)</option>
                  </select>
                  {errors.fuelType && (
                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <IoMdWarning className="mr-1" /> {errors.fuelType}
                    </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="fuelConsumed">Fuel Consumed (liters):</label>
                  <input
                    type="number"
                    id="fuelConsumed"
                    name="fuelConsumed"
                    value={fuelConsumed}
                    onChange={(e) => setFuelConsumed(e.target.value)}
                    className="form-control"
                    placeholder="Enter fuel consumed"
                  />
                  {errors.fuelConsumed && (
                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <IoMdWarning className="mr-1" /> {errors.fuelConsumed}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-light mb-3 mt-4" style={{ background: '#55E91F', border: 'none' }}>
                  <FaCog className="spin" /> Calculate
                </button>
              </form>
              <h2 className="text-success d-flex align-items-center m-3">
                <FaTree className="mr-2" /> Results
              </h2>
              <div className="card p-4 mb-4 text-dark">
                <h3 className="h5 mb-3">Carbon Emission Results</h3>
                <div className="mb-3">
                  <p className="mb-1">Estimated Carbon Emission:</p>
                  <h4 className="text-danger">{carbonEmission} kg CO₂</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransportBasedCalc;
