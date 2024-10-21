import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import ImageCard from './ImageCard';

const ImageGallery = ({ svgColor, bgColor, searchInput }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let allImages = [];
        let page = 1;
        let totalPages;

        do {
          const response = await fetch(`http://localhost/headlesswp/the2px/wp-json/wp/v2/svg_images?per_page=100&page=${page}`); // Fetch 100 images per page
          if (!response.ok) {
            throw new Error(`Error fetching images: ${response.statusText}`);
          }

          const data = await response.json();
          allImages = allImages.concat(data); // Combine the new images with existing images
          totalPages = response.headers.get('X-WP-TotalPages'); // Get the total pages
          page++;
        } while (page <= totalPages);

        // Process the images here
        const decodedData = allImages.map(image => {
          const fileUrl = image.svg_image_file || '';
          return {
            ...image,
            file: fileUrl.replace(/\/\//g, '/'),
            file: fileUrl.startsWith('http') ? fileUrl : `http://localhost${fileUrl}`,
            tags: image.svg_image_tags ? image.svg_image_tags.split(',') : [], // Split tags into an array
          };
        });

        setImages(decodedData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  // Filter images based on search input
  const filteredImages = images.filter(image => {
    const searchValue = searchInput.toLowerCase();
    const tags = image.tags ? image.tags.join(' ') : ''; // Use the tags array to check for matches
    return (
      tags.toLowerCase().includes(searchValue) ||
      (image.description && image.description.toLowerCase().includes(searchValue)) ||
      (image.title.rendered && image.title.rendered.toLowerCase().includes(searchValue))
    );
  });

  return (
    <div className="image-gallery container">
      <div className="row">
        {filteredImages.map((image) => (
          <div className="col-4 mb-4" key={image.id}> {/* Custom column class for 3 cards in a row */}
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

// Prop types for better type checking
ImageGallery.propTypes = {
  svgColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  searchInput: PropTypes.string.isRequired,
};

export default ImageGallery;
