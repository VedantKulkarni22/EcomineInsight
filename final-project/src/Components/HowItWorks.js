import React, { useState, useEffect } from "react";
import {FaLeaf, FaChartArea, FaCalculator, FaChartBar, FaLightbulb } from "react-icons/fa";
import { MdDirectionsCar, MdElectricBolt, MdGrain } from "react-icons/md";
// import { useNavigate } from "react-router-dom";


const HowItWorks = () => {
    const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY;

      sections.forEach((section, index) => {
        if (
          scrollPosition >= section.offsetTop - 100 &&
          scrollPosition < section.offsetTop + section.offsetHeight - 100
        ) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll("section");
    sections[index].scrollIntoView({ behavior: "smooth" });
  };


  const sections = [
    {
      title: "Introduction",
      icon: <FaLeaf className="fs-1 mb-3" />,
      content:
        "Discover the importance of understanding your carbon footprint and its impact on the environment. Our calculator helps you assess the impact of the carbon footprint generated due to coal mining activities in the mine.",
    },
    {
      title: "Data Input",
      icon: <MdDirectionsCar className="fs-1 mb-3" />,
      content:
        "Input your emission factor and other required information based on the type of calculator like size of the coal mine, amount of coal mined, fuel type and similar types of values, Our user-friendly interface makes it easy to provide accurate information for a precise calculation.",
    },
    {
      title: "Calculation",
      icon: <FaCalculator className="fs-1 mb-3" />,
      content:
        "Our advanced calculating process uses your input data to calculate carbon footprint of different major factors inside a coal mine.",
    },
    {
      title: "Results",
      icon: <FaChartBar className="fs-1 mb-3" />,
      content:
        "Enter your estimation of carbon footprint and view your carbon footprint results in metric tons of CO2 equivalent.",
    },
    {
      title: "Action Steps",
      icon: <FaLightbulb className="fs-1 mb-3" />,
      content:
        "Receive tailored recommendations to reduce your carbon footprint. From energy-saving tips to sustainable transportation options, we guide you towards a more eco-friendly lifestyle with actionable steps.",
    },
  ];

  return (
    <div className="text-white min-vh-100" style={{background : '#0D1321'}}>
        <nav className="navbar navbar-expand-lg navbar-dark rounded-3 pt-4 mb-3">
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
      <header className="py-4 text-center" style={{background : '#55E91F', color: '#0D1321'}}>
        <h1 className="display-4">How It Works</h1>
        <p>Understand Your Carbon Footprint</p>
      </header>

      <nav className="sticky-top py-3" style={{background : '#0D1321', color : '#55E91F'}}>
        <div className="container text-center">
          <ul className="nav justify-content-center">
            {sections.map((section, index) => (
              <li key={index} className="nav-item">
                <button
                  onClick={() => scrollToSection(index)}
                  className="btn btn-link text-uppercase fw-bold text-decoration-none" style={activeSection === index ? { color: '#55E91F' } : { color: 'white' }}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container py-5">
        {sections.map((section, index) => (
          <section
            key={index}
            aria-labelledby={`section-${index}`}
            style={{marginBottom: '6rem', marginTop : '6rem'}}
          >
            <div className="text-center mb-4">
              {section.icon}
              <h2  style={{color: '#55E91F'}} id={`section-${index}`}>
                {section.title}
              </h2>
            </div>
            <p className="lead">{section.content}</p>
            {index === 1 && (
              <div className="p-4 rounded m-4" style={{background: 'rgb(31 41 55)'}}>
                <h3 style={{color: '#55E91F'}}>Calculators Categories</h3>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center">
                    <MdDirectionsCar className="me-2" style={{color: '#55E91F'}}/>
                    Transportation Based
                  </li>
                  <li className="d-flex align-items-center">
                    <MdElectricBolt className="me-2" style={{color: '#55E91F'}}/>
                    Machinery Based
                  </li>
                  <li className="d-flex align-items-center">
                    <MdGrain className="me-2" style={{color: '#55E91F'}}/>
                    Amount of Coal Mined Based
                  </li>
                  <li className="d-flex align-items-center">
                    <FaChartArea className="me-2" style={{color: '#55E91F'}}/>
                    Coal Mine Size Based
                  </li>
                </ul>
              </div>
            )}
            {index === 3 && (
              <div className="p-4 rounded" style={{background: 'rgb(31 41 55)'}}>
                <h3 style={{color: '#55E91F'}}>Sample Result</h3>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-center">
                    <p className="display-6">8.2</p>
                    <p>Metric Tons CO2e/year</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}
      </main>

      <footer className="text-white py-4 text-center" style={{background: 'rgb(31 41 55)'}}>
        <p className="mb-4">Start reducing your carbon footprint today. Every action counts!</p>
        <a className="btn px-5 py-2" href="/loginsignup" style={{background: '#55E91F'}}>Calculate Now</a>
      </footer>
    </div>
  );
};

export default HowItWorks;
