import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from './style.css';

const ImageDisplay = () => {
  // API Key: 918p1dF8saIBXzpTzId02oTk3bIllwy5afp3BVdc
  // Example Request: https://api.nasa.gov/planetary/apod?api_key=918p1dF8saIBXzpTzId02oTk3bIllwy5afp3BVdc

  const [cookies, setCookie, removeCookie] = useCookies(['likedImages']);
  var likedImages = cookies.likedImages;

  // Get and store data as a json object from NASA's API
  const [data, setData] = useState([]);
  const getRandomizedData = () => {
    fetch('https://api.nasa.gov/planetary/apod?count=1&api_key=918p1dF8saIBXzpTzId02oTk3bIllwy5afp3BVdc')
      .then(response => response.json())
      .then(json => {
        setData(json[0]);
        setLiked(likedImages && likedImages.includes(json[0].url));
      })
  }
  useEffect(getRandomizedData, []);

  // Helper function to display a message temporarily
  const [message, setMessage] = useState([]);
  useEffect(() => { setMessage('') }, [])
  const displayTempMessage = (message, time) => {
    setMessage(message);
    setTimeout(() => { setMessage('') }, time);
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

  // Like/unlike an image based on whether image is liked
  const likeImage = () => {
    // Set like/unlike and add url to cookie
    setLiked(liked ? false : true);

    if (!liked) {
      if (!likedImages) likedImages = [data.url];
      else likedImages.push(data.url);
    } else {
      for (var i = 0; i < likedImages.length; i++) {
        if (likedImages[i] === data.url) likedImages.splice(i, 1);
      }
    }

    setCookie('likedImages', likedImages);
  }

  // Display a loading animation if data fetching is not yet completed
  const imageDisplay = () => {
    if (!data.url) {
      return (
        <div className='d-flex align-items-center justify-content-center'>
          <div className='spinner-border' role='status'>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h3 className='text-center'>{data.title}</h3>
          <div className='text-center mx-auto'>
            <img className='img-fluid' src={data.url} onClick={(event) => {
              if (event.detail == 2) likeImage();
            }} />
          </div>

          <br />
          <div className='row'>
            <div className='col'>
              <p className='text-end'>{data.copyright ? data.copyright : "Unknown"}</p>
            </div>
            <div className='col-2'></div>
            <div className='col'>
              <p className='text-start'>{data.date}</p>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <button type='button' className='btn btn-sm float-end heart' data-toggle="tooltip" data-placement="bottom" title="Like image" onClick={() => { likeImage(); }}>
                {/* Show different icons based on whether the image is liked */}
                {liked ? <i className='bi bi-heart-fill icon'></i> : <i className='bi bi-heart icon'></i>}
              </button>
            </div>

            <div className='col'>
              <button type='button' className='btn btn-sm float-start' data-toggle="tooltip" data-placement="bottom" title="Share image" onClick={() => {
                // Copy image url to clipboard
                navigator.clipboard.writeText(data.url);
                displayTempMessage('Image link copied to clipboard', 3000);
              }}>
                <i className='bi bi-share icon'></i>
              </button>
            </div>

            <div className='col'>
              <button type='button' className='btn btn-sm float-start' data-toggle="tooltip" data-placement="bottom" title="Next image" onClick={() => { getRandomizedData(); }}>
                <i className='bi bi-arrow-right-circle icon'></i>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className='row'>
      <hr />
      <div className='col-1'></div>

      <div className='col-10'>
        {imageDisplay()}
      </div>

      <div className='col-1'>
      </div>

      {tempMessage()};
    </div>
  );
}

export default ImageDisplay;