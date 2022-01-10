import React from 'react';
import ImageDisplay from './ImageDisplay';
import './bootstrap.css';
import './style.css';

const App = () => {
  return (
    <div className='row'>
      <div className='col-1'></div>
      <div className='col-10'>
        <div className='text-center'>
          <br />
          <h1><i className='bi bi-moon-stars-fill'></i> Spacestagram</h1>
          <p><div className='lead'>Image-sharing from the final frontier</div>
            Brought to you by NASA's Astronomy Photo of the Day (APOD) API
          </p>
        </div>
      </div>
      <div className='col-1'></div>
      <ImageDisplay />
    </div>
  );
}

export default App;