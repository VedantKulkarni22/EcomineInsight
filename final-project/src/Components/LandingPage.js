import React from "react";
import '../Styles/LandingPage.css';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

export default function LandingPage() {
  const [multitext] = useTypewriter({
    words: [
      "Give some information and find out the carbon emission.", 
      "Based on which get a remedy and get your problem dealt with!", 
      "Only on EcoMine Insight signup now!"
    ],
    loop: true,
    typeSpeed: 20,
    deleteSpeed: 20,
  });

  return (
    <div className="LandingPage ">
            <nav className="navbar navbar-expand-lg navbar-dark rounded-3 pt-4 mb-5">
                <div className="container-fluid">
                        <a className="navbar-brand fw-bold fs-2" href="/"><img className="rounded-circle" src='images/co2.png' height="44.8px" width="86.8" alt="logo"></img><span className='BrandName1'>EcoMine</span><span className="BrandName2">Insight</span></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link fs-6 rounded-3 m-1" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-6 rounded-3 m-1" href="/howitworks">How it works?</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto mb-lg-0">
                                <li className="nav-item">
                                    <a href="/loginsignup">
                                        <button type="button" className="opt btn btn-outline-dark m-2">SignUp</button>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/loginsignup">
                                        <button type="button" className="opt btn btn-outline-dark m-2">Login</button>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                        
                        </div>
                </nav>

        <div className="crd row g-0">
          <div className="col-md-5 p-5 d-flex flex-column justify-content-center">
            <h5 className="card-title fw-bolder mb-4">
              Want To Calculate Carbon Footprint?
            </h5>
            <p className="card-text">Do you want to measure carbon emission?</p>
            <p className="card-text">
              <span className='Multitext rounded-3'>{multitext}</span>
              <Cursor cursorStyle="🌲" cursorBlinking={false} />
            </p>
            <div>
              <a href="/loginsignup">
                <button type="button" className="opt1 btn btn-outline-dark">SignUp</button>
                <button type="button" className="opt1 btn btn-outline-dark m-2">Login</button>
              </a>
            </div>
          </div>
        </div>
      </div>
  );
}
