import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
const Spinner = ({ color = '#000000' }) => {
  return(
    <div className="row ml-2 spinner-wrapper">
      <Loader type="Circles" color={color} height={25} width={25}/>
      <span className="spinner-text" style={{ color }}>Loading...</span>
    </div>
  );
}
export default Spinner;
