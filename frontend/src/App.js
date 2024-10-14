// App.js
import React, { useState } from 'react';
import Navbar from './components/navbar'; // Match the casing here
import ImageGallery from './components/ImageGallery';
import './App.css'; // Make sure to include your CSS

const App = () => {
  const [svgColor, setSvgColor] = useState('#6c63ff'); // Default SVG color
  const [bgColor, setBgColor] = useState('#ffffff'); // Default background color

  return (
    <div>
      <Navbar svgColor={svgColor} setSvgColor={setSvgColor} bgColor={bgColor} setBgColor={setBgColor} />
      <ImageGallery svgColor={svgColor} bgColor={bgColor} />
    </div>
  );
};

export default App;
