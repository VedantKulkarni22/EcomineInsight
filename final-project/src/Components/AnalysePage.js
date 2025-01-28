import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/LandingPage.css";
import "../Styles/AnalysePage.css";
import axios from "axios";

const AnalysePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const totalCarbonFootprint = searchParams.get("totalCarbonFootprint");
  const loginStatus = searchParams.get("loginStatus");
  const [inheritedValue, setInheritedValue] = useState(0);
  const [predictedRemedies, setPredictedRemedies] = useState([]);
  const [error, setError] = useState("");

  // Set the inherited value on component load
  useEffect(() => {
    setInheritedValue(totalCarbonFootprint);
  }, [totalCarbonFootprint]);

  // Handle Logout
  const handleLogout = () => {
    navigate(`/loginsignup?loginStatus=${null}`);
  };

  // Handle Profile Navigation
  const handleProfile = () => {
    navigate(`/profile?loginStatus=${loginStatus}`);
  };

  // Store inherited value, fetch history, and get remedies
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If valid, continue with the process
      // Step 1: Store inherited value in the database
      const storeResponse = await axios.post(
        "http://localhost:3001/cfhistorystored",
        {
          email: loginStatus,
          calculatedValue: inheritedValue,
          calculationType: "total",
        }
      );

      if (storeResponse.status === 200) {
        console.log("Inherited value stored successfully");

        // Step 2: Fetch the last 5 history entries
        const historyResponse = await axios.get(
          `http://localhost:3001/fetchHistory?email=${loginStatus}&limit=5`
        );

        if (historyResponse.status === 200) {
          console.log("Fetched History:", historyResponse.data);

          // Exclude history values with type 'total'
          const sortOrder = ["coal_mined", "size", "machinery", "transport"];
          const filteredHistory = historyResponse.data.filter(
            (entry) => entry.calculation_type !== "total"
          );

          // Sort based on the custom order
          const sortedHistory = filteredHistory.sort(
            (a, b) =>
              sortOrder.indexOf(a.calculation_type) -
              sortOrder.indexOf(b.calculation_type)
          );

          // Extract the values for prediction and map them to the model's expected input format
          const inputData = {
            "Coal_Mined_CF(tons)": 0,
            "Mine_Size_CF(tons/m^2)": 0,
            "Machinery_Carbon_CF(tons)": 0,
            "Transportation_Carbon_CF(tons)": 0,
          };

          sortedHistory.forEach((entry) => {
            if (entry.calculation_type === "coal_mined") {
              inputData["Coal_Mined_CF(tons)"] = entry.value;
            } else if (entry.calculation_type === "size") {
              inputData["Mine_Size_CF(tons/m^2)"] = entry.value;
            } else if (entry.calculation_type === "machinery") {
              inputData["Machinery_Carbon_CF(tons)"] = entry.value;
            } else if (entry.calculation_type === "transport") {
              inputData["Transportation_Carbon_CF(tons)"] = entry.value;
            }
          });

          console.log("Formatted Input Data for Prediction:", inputData);

          // Step 3: Get predicted remedies based on the formatted input data
          const predictionResponse = await axios.post(
            "http://127.0.0.1:5000/predict",
            inputData
          );

          // Log the full response from the prediction API for debugging
          console.log("Prediction API Response:", predictionResponse);

          if (
            predictionResponse.status === 200 &&
            predictionResponse.data.predicted_remedies
          ) {
            setPredictedRemedies(predictionResponse.data.predicted_remedies); // All remedies returned by API
          } else {
            setError("Failed to fetch predicted remedies.");
            console.error("Prediction Error:", predictionResponse.data);
          }
        } else {
          setError("Failed to fetch history entries.");
          console.error("History Fetch Error:", historyResponse.data);
        }
      } else {
        setError("Failed to store inherited value.");
        console.error("Store Response Error:", storeResponse.data);
      }
    } catch (error) {
      console.error("Error occurred during storing/fetching:", error);

      // Log detailed error info from axios
      if (error.response) {
        console.error("Response Error: ", error.response);
        setError(
          `Error: ${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        console.error("Request Error: ", error.request);
        setError("No response received from the server.");
      } else {
        console.error("General Error: ", error.message);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark pt-4"
        style={{ background: "linear-gradient(to right, #2d3748, #2f855a)" }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand fw-bold fs-2"
            href={`/sizebasedcalc?loginStatus=${loginStatus}`}
          >
            <img
              className="rounded-circle"
              src="images/co2.png"
              height="44.8px"
              width="86.8"
              alt="logo"
            />
            <span className="BrandName1">EcoMine</span>
            <span className="BrandName2">Insight</span>
          </a>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link fs-6 rounded-3 m-1"
                href={`/history?loginStatus=${loginStatus}`}
              >
                History
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-lg-0">
            <li className="nav-item">
              <button
                type="button"
                onClick={handleProfile}
                className="opt btn btn-outline-dark m-2"
              >
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                onClick={handleLogout}
                className="opt btn btn-outline-dark m-2"
              >
                LogOut
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className="min-vh-100 d-flex align-items-center justify-content-center p-4"
        style={{ background: "linear-gradient(to right, #2d3748, #2f855a)" }}
      >
        <div
          className="container w-50 my-5 p-4 text-white rounded shadow"
          style={{ background: "#0D1321" }}
        >
          <h1 className="text-center mb-4" style={{ color: "#55E91F" }}>
            Carbon Footprint Calculator
          </h1>

          <div className="form-group mb-3">
            <label htmlFor="inheritedValue" style={{ fontSize: "20px" }}>
              Calculated Carbon Footprint Value (tons)
            </label>
            <input
              type="text"
              id="inheritedValue"
              value={inheritedValue}
              readOnly
              className="form-control"
              aria-label="Inherited Carbon Footprint Value"
            />
          </div>

          <button className="btns btn w-100 mb-3" onClick={handleSubmit}>
            Generate Remedies
          </button>

          {/* Error Message */}
          {error && <p className="text-danger text-center">{error}</p>}

          {/* Predicted Remedies */}
          {predictedRemedies.length > 0 && (
            <div className="remedies-section mt-3">
              <h4 className="text-center" style={{ color: "#55E91F" }}>
                <img
                  src="images/leaf.png"
                  height="25px"
                  width="25px"
                  className="me-2"
                />
                Suggested Remedies
                <img
                  src="images/leaf.png"
                  height="25px"
                  width="25px"
                  className="ms-2"
                />
              </h4>
              <ul className="list-group mt-3">
                {predictedRemedies.map((remedy, index) => (
                  <li
                    key={index}
                    className="list-group-item text-dark mb-2"
                    style={{
                      background: "#ffffff",
                      border: "1px solid #2f855a",
                      borderRadius: "5px",
                    }}
                  >
                    {remedy}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnalysePage;
