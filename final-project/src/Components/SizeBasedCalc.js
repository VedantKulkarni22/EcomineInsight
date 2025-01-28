import React, { useState, useEffect } from "react";
import { FaTree, FaIndustry, FaCog } from "react-icons/fa";
import { IoMdWarning } from "react-icons/io";
import '../Styles/LandingPage.css';
// import Navbar from '../Components/Navbar';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from 'axios';  // Import axios


const SizeBasedCalc = () => {
  const [formData, setFormData] = useState({
    emissionFactor: "",
    mineSize: ""
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loginStatus = searchParams.get('loginStatus'); // Extract the 'email' parameter
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const calculateCarbonFootprint = () => {
      const {
        emissionFactor,
        mineSize
      } = formData;

      let total = 0;

      if (emissionFactor && mineSize) total += parseFloat(emissionFactor * mineSize);

      setCarbonFootprint(total.toFixed(2));
    };

    calculateCarbonFootprint();
  }, [formData]);

  const handleLogout = () => {
    navigate(`/loginsignup?loginStatus=${null}`);
  };

  const handleProfile = () => {
    navigate(`/profile?loginStatus=${loginStatus}`);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.emissionFactor) newErrors.emissionFactor = "Emission Factor is required";
    if (!formData.mineSize) newErrors.mineSize = "Size of coal mine is required";
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
                calculationType: 'size', // Or whatever type this calculator represents
            });

            if (response.status === 200) {
              console.log("Carbon footprint stored successfully!");
          } else {
              console.error("Failed to store carbon footprint.");
          }

            navigate(`/coalminedbasedcalc?carbonFootprint=${carbonFootprint}&loginStatus=${loginStatus}`);
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
              <h3 className="text-3xl font-bold mb-4 d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-rulers ms-1 me-3" viewBox="0 0 16 16">
                <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1z"/>
                </svg> Size Based Calculator <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-rulers me-2" viewBox="0 0 16 16" transform="rotate(90 8 8)">
                <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1z"/>
                </svg>
              </h3>
              {/* <h5>login = {loginStatus}</h5> */}
              <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="emissionFactor">Emission Factor (tCO<sub>2</sub>/m<sup>2</sup>)</label>
                  <input
                    type="number"
                    id="emissionFactor"
                    name="emissionFactor"
                    step="0.01"
                    value={formData.emissionFactor}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Emission Factor"
                  />
                  {errors.emissionFactor && (
                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <IoMdWarning className="mr-1" /> {errors.emissionFactor}
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="mineSize">Size of Coal Mine (m<sup>2</sup>)</label>
                  <input
                    type="number"
                    id="mineSize"
                    name="mineSize"
                    value={formData.mineSize}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Size of Coal Mine"
                  />
                  {errors.mineSize && (
                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <IoMdWarning className="mr-1" /> {errors.mineSize}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-light btn-block mt-4" style={{ background: '#55E91F', border: 'none' }}>
                  <FaCog className="m-2 spin" /> Calculate
                </button>
              </form>
              <h2 className="text-success d-flex align-items-center m-3">
                <FaTree className="mr-2" /> Results
              </h2>
              <div className="card p-4 mb-4 text-dark">
                <h3 className="h5 mb-3">Carbon Footprint Results</h3>
                <div className="mb-3">
                  <p className="mb-1">Estimated Carbon Footprint:</p>
                  <h4 className="text-danger">{carbonFootprint} tons CO<sub>2</sub></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SizeBasedCalc;
