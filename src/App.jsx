import React from 'react';
import ImageDisplay from './ImageDisplay';
import './bootstrap.css';
import './style.css';

const App = () => {
  return (
    <div>
      <br />
      <div className='text-center'>
        <h1><i className='bi bi-moon-stars-fill'></i> Spacestagram</h1>
        <p><div className='lead'>Image-sharing from the final frontier</div>
          Brought to you by NASA's Astronomy Photo of the Day (APOD) API
        </p>
      </div>
      <ImageDisplay />
    </div>
  );
}

export default App;