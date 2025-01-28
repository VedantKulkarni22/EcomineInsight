import React from "react";
import '../Styles/LandingPage.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark pt-4" style={{ background: 'linear-gradient(to right, #2d3748, #2f855a)' }}>
      <div className="container-fluid">
        <a className="navbar-brand fw-bold fs-2" href="/">
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
            <a
              className="nav-link fs-6 rounded-3 m-1"
              aria-current="page"
              href="/"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
                    <a className="nav-link fs-6 rounded-3 m-1" href="#howitworks">History</a>
                </li>
                {/* <li className="nav-item">
                    <a className="nav-link fs-6 rounded-3 m-1" href="#about">Profile</a>
                </li> */}
        </ul>
        <ul className="navbar-nav ms-auto mb-lg-0">
          <li className="nav-item">
                    <a href="#profile">
                        <button type="button" className="opt btn btn-outline-dark m-2">Profile</button>
                    </a>
                </li>
                {/* <li className="nav-item">
                    <a href="/loginsignup">
                        <button type="button" className="opt btn btn-outline-dark m-2">Login</button>
                    </a>
                </li> */}
        </ul>
      </div>
      <div></div>
    </nav>
  );
}
