import React, { useState, useEffect } from 'react';

const ImageDisplay = () => {
  // API Key: 918p1dF8saIBXzpTzId02oTk3bIllwy5afp3BVdc
  // Example Request: https://api.nasa.gov/planetary/apod?api_key=918p1dF8saIBXzpTzId02oTk3bIllwy5afp3BVdc

  // Get and store data as a json object from NASA's API
  const [data, setData] = useState([]);
  const getData = () => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=918p1dF8saIBXzpTzId02oTk3bIllwy5afp3BVdc')
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
  }
  useEffect(getData, []);

  // Helper function to display a message temporarily
  const [message, setMessage] = useState([]);
  useEffect(() => { setMessage("") }, [])
  const displayTempMessage = (message, time) => {
    setMessage(message);
    setTimeout(() => { setMessage("") }, time);
  }
  const tempMessage = () => {
    if (!message) return (<div></div>);
    else return (
      <div className='d-flex align-items-center justify-content-center'>
        <br />
        <br />
        <br />
        <br />
        <br />
        <p className='text-center message'>{message}</p>
      </div>
    );
  }

  // Whether an image is already liked by user or not
  const [liked, setLiked] = useState([]);
  useEffect(() => { setLiked(false) }, []);
  // Like/unlike an image based on whether image is liked
  const likeImage = () => {
    setLiked(liked ? false : true);
  }
  const likeIcon = () => {
    if (liked) {
      return (<i className="bi bi-heart-fill icon"></i>);
    } else {
      return (<i className="bi bi-heart icon"></i>);
    }
  }

  return (
    <div className='row'>
      <div className='col-1'></div>

      <div className='col-10'>

        <h2 className='text-center'>{data.title}</h2>
        <div className='img-container text-center mx-auto'>
          <img className='img-fluid' src={data.url} onClick={(event) => {
            if (event.detail == 2) likeImage();
          }} />
        </div>

        <br />

        <div className='row'>
          <div className='col'>
            <p className='text-end'>{data.copyright}</p>
          </div>
          <div className='col-2'></div>
          <div className='col'>
            <p className='text-start'>{data.date}</p>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <button type='button' className='btn btn-outline-light float-end' onClick={() => {
              likeImage();
            }}>
              {/* Show different icons based on whether the image is liked */}
              {likeIcon()}
            </button>
          </div>

          <div className='col'>
            <button type='button' className='btn btn-outline-light float-start' onClick={() => {
              // Copy image url to clipboard
              navigator.clipboard.writeText(data.url);
              displayTempMessage("Image link copied to clipboard", 3000);
            }}>
              <i className="bi bi-share icon"></i>
            </button>
          </div>
        </div>

      </div>

      <div className='col-1'></div>

      {tempMessage()};

    </div>
  );
}

export default ImageDisplay;