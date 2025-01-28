import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/selector.css'; // Ensure this path is correct

const Selectorhome = () => {
  const [selectedSections, setSelectedSections] = useState([]);
  const navigate = useNavigate();

  const sections = [
    { name: 'Section 1', path: '/sizebasedcalc' },
    { name: 'Section 2', path: '/coalminedbasedcalc' },
    { name: 'Section 3', path: '/machinerybasedcalc' },
    { name: 'Section 4', path: '/transportbasedcalc' }
  ];

  const toggleSelection = (section) => {
    setSelectedSections(prev => 
      prev.some(s => s.name === section.name)
        ? prev.filter(s => s.name !== section.name)
        : [...prev, section]
    );
  };

  const handleNavigation = () => {
    // Navigate through selected sections one by one
    selectedSections.forEach((section, index) => {
      setTimeout(() => navigate(section.path), index * 1000); // Adjust delay as needed
    });
  };

  return (
    <div className="circle-container">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`circle-section ${selectedSections.some(s => s.name === section.name) ? 'selected' : ''}`}
          onClick={() => toggleSelection(section)}
        >
          {section.name}
        </div>
      ))}
      <button className='bt' onClick={handleNavigation} disabled={selectedSections.length === 0}>
        Navigate to Selected
      </button>
    </div>
  );
};

export default Selectorhome;
