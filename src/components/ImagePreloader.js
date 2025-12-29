import React from 'react';

const ImagePreloader = () => {
  return (
    <div style={{ display: 'none' }}>
      {/* Preload critical images */}
      <link rel="preload" as="image" href="/images/logo.png" />
      <link rel="preload" as="image" href="/images/image2.jpg" />
      <link rel="preload" as="image" href="/images/placeholder1.jpg" />
    </div>
  );
};

export default ImagePreloader;
