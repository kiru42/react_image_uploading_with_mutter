import React from 'react'

const ImageDisplay = ({ images }) => {
  return (
    <div className="image-display">
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <img src={image.url} alt={`something ${index}`} />
        </div>
      ))}
    </div>
  )
}

export default ImageDisplay
