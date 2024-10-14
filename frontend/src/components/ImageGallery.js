import React, { useEffect, useState } from 'react';
import ImageCard from './ImageCard';

const ImageGallery = ({ svgColor, bgColor }) => {
  const [images, setImages] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost/headlesswp/the2px/wp-json/wp/v2/svg_images');
        if (!response.ok) {
          throw new Error(`Error fetching images: ${response.statusText}`);
        }

        const data = await response.json();
        const decodedData = data.map(image => {
          const fileUrl = image.svg_image_file || '';
          return {
            ...image,
            file: fileUrl.replace(/\/\//g, '/'),
            file: fileUrl.startsWith('http') ? fileUrl : `http://localhost${fileUrl}`,
          };
        });

        setImages(decodedData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const filteredImages = images.filter(image => {
    const searchValue = searchInput.toLowerCase();
    const tags = image.tags ? image.tags.join(' ') : '';
    return (
      tags.toLowerCase().includes(searchValue) ||
      (image.description && image.description.toLowerCase().includes(searchValue)) ||
      (image.title.rendered && image.title.rendered.toLowerCase().includes(searchValue))
    );
  });

  return (
    <div className="image-gallery container">
      <h1 className="text-center my-4">SVG Image Gallery</h1>
      <input
        type="text"
        placeholder="Search by tags..."
        className="form-control mb-4"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div className="row">
        {filteredImages.map((image) => (
          <div className="col-md-4" key={image.id}>
            <ImageCard
              title={image.title.rendered}
              description={image.description}
              svgUrl={image.file}
              svgColor={svgColor}
              backgroundColor={bgColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
