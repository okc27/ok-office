import React, { useEffect, useState } from 'react';
import './navbar.css'; // Make sure to import your CSS file for custom styles

const Navbar = ({ svgColor, setSvgColor, bgColor, setBgColor }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 0); // Set to true if scrolled down
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up the event listener
    };
  }, []);

  return (
    <nav className={`navbar navbar-light ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-fluid">
        <div className="navbar-brand" onClick={() => console.log("Brand clicked!")}>
          <b>the2px</b>
        </div>
        <div className="color-picker d-flex justify-content-center"> {/* Center color pickers */}
          <label htmlFor="svg-color-picker" className="me-2">SVG Color:</label>
          <input
            type="color"
            id="svg-color-picker"
            value={svgColor}
            onChange={(e) => setSvgColor(e.target.value)}
          />
          <label htmlFor="background-color-picker" className="mx-2">Background Color:</label>
          <input
            type="color"
            id="background-color-picker"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
