import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/HistoryPage.css';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const loginStatus = searchParams.get("loginStatus");
    const [historyData, setHistoryData] = useState({
        sizeBased: [],
        coalMined: [],
        machinery: [],
        transport: [],
        total: []
    });

    const handleLogout = () => {
        navigate(`/loginsignup?loginStatus=${null}`);
      };

      const handleProfile = () => {
        navigate(`/profile?loginStatus=${loginStatus}`);
      };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const email = loginStatus; // Ensure this is correct
                const response = await axios.get(`http://localhost:3001/cfhistory/${email}`);

                // Initialize arrays for different calculation types
                const sizeBased = [];
                const coalMined = [];
                const machinery = [];
                const transport = [];
                const total = [];

                // Categorize the data based on calculation_type
                response.data.forEach(item => {
                    switch (item.calculation_type) {
                        case 'size':
                            sizeBased.push(item);
                            break;
                        case 'coal_mined':
                            coalMined.push(item);
                            break;
                        case 'machinery':
                            machinery.push(item);
                            break;
                        case 'transport':
                            transport.push(item);
                            break;
                        case 'total':
                            total.push(item);
                            break;
                        default:
                            break;
                    }
                });

                // Set state with categorized data
                setHistoryData({
                    sizeBased,
                    coalMined,
                    machinery,
                    transport,
                    total
                });

                console.log("Updated historyData state:", {
                    sizeBased,
                    coalMined,
                    machinery,
                    transport,
                    total
                });
            } catch (error) {
                console.error('Error fetching history data:', error);
            }
        };

        fetchHistory();
    }, [loginStatus]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark pt-4" style={{ background: '#0D1321' }}>
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
                        {/* <li className="nav-item">
                            <a
                                className="nav-link fs-6 rounded-3 m-1"
                                aria-current="page"
                                href="/loginsignup"
                            >
                                Home
                            </a>
                        </li> */}
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
            </nav>
            <div className='d-flex flex-column min-vh-100' style={{ background: '#0D1321' }}>
            <hr style={{ height: '2px', borderWidth: '0', color: 'white', backgroundColor: 'white' }} />
                <h1 style={{ color: 'white' }} className="text-center m-3">Carbon Footprint Calculator History</h1>
                <hr style={{ height: '2px', borderWidth: '0', color: 'white', backgroundColor: 'white' }} />
                <div className="">
                    <div className="d-flex flex-row justify-content-evenly" style={{ color: 'white' }}>
                        {/* Size Based History */}
                        <div className="col-md-2 history-column fs-5 m-2">
                            <h2 className="text-center">Mine Size Based</h2>
                            <ul className="list-group">
                                {historyData.sizeBased && historyData.sizeBased.length > 0 ? (
                                    historyData.sizeBased.map((item, index) => (
                                        <li key={index} className="list-group-item">
                                           Date : {new Date(item.created_at).toLocaleString()} 
                                           <li>
                                            <strong>Carbon Footprint: {item.calculated_value}</strong> tons CO2
                                            </li>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item">No data available</li>
                                )}
                            </ul>
                        </div>
                        {/* Coal Mined History */}
                        <div className="col-md-2 history-column fs-5 m-2">
                            <h2 className="text-center">Coal Mined Based</h2>
                            <ul className="list-group">
                                {historyData.coalMined && historyData.coalMined.length > 0 ? (
                                    historyData.coalMined.map((item, index) => (
                                        <li key={index} className="list-group-item">
                                           Date: {new Date(item.created_at).toLocaleString()}
                                            <li>
                                            <strong>Carbon Footprint: {item.calculated_value}</strong> tons CO2
                                            </li>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item">No data available</li>
                                )}
                            </ul>
                        </div>
                        {/* Machinery Based History */}
                        <div className="col-md-2 history-column fs-5 m-2">
                            <h2 className="text-center">Machinery Based</h2>
                            <ul className="list-group">
                                {historyData.machinery && historyData.machinery.length > 0 ? (
                                    historyData.machinery.map((item, index) => (
                                        <li key={index} className="list-group-item">
                                         Date: {new Date(item.created_at).toLocaleString()} 
                                         <li><strong>Carbon Footprint: {item.calculated_value}</strong> tons CO2</li>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item">No data available</li>
                                )}
                            </ul>
                        </div>
                        {/* Transport Based History */}
                        <div className="col-md-2 history-column fs-5 m-2">
                            <h2 className="text-center">Transport Based</h2>
                            <ul className="list-group">
                                {historyData.transport && historyData.transport.length > 0 ? (
                                    historyData.transport.map((item, index) => (
                                        <li key={index} className="list-group-item">
                                         Date: {new Date(item.created_at).toLocaleString()}
                                         <li>Carbon Footprint: <strong>{item.calculated_value}</strong> tons CO2</li>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item">No data available</li>
                                )}
                            </ul>
                        </div>
                        {/* Total */}
                        <div className="col-md-2 history-column fs-5 m-2">
                            <h2 className="text-center">Total Footprint</h2>
                            <ul className="list-group">
                                {historyData.total && historyData.total.length > 0 ? (
                                    historyData.total.map((item, index) => (
                                        <li key={index} className="list-group-item">
                                         Date: {new Date(item.created_at).toLocaleString()}
                                         <li>Carbon Footprint: <strong>{item.calculated_value}</strong> tons CO2</li>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item">No data available</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistoryPage;
