import React, { useState } from 'react';
import Navbar from './components/navbar'; // Ensure the correct path and casing
import ImageGallery from './components/ImageGallery';
import Footer from './components/Footer'; // Import Footer
import './App.css'; // Ensure CSS is included for global styles

const App = () => {
  const [svgColor, setSvgColor] = useState('#c1272d'); // Default SVG color
  const [bgColor, setBgColor] = useState('#fdfdfd'); // Default background color
  const [searchInput, setSearchInput] = useState(''); // State for search input

  return (
    <div className="app"> {/* Add class for flex styling */}
      <Navbar
        svgColor={svgColor}
        setSvgColor={setSvgColor}
        bgColor={bgColor}
        setBgColor={setBgColor}
        searchInput={searchInput} // Pass search input to Navbar
        setSearchInput={setSearchInput} // Pass search input setter to Navbar
      />
      <main className="content">
        <ImageGallery 
          svgColor={svgColor} 
          bgColor={bgColor} 
          searchInput={searchInput} 
        />
      </main>
      <Footer /> {/* Add Footer at the bottom */}
    </div>
  );
};

export default App;
