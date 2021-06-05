import React, { useState } from 'react';
import './App.css';
import GetWeatherAPI from './api/OpenWeatherAPI/app';


function App() {

  

  return (

    <div className="App">
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi" />

      

      <GetWeatherAPI/>

    </div>
  );

}


export default App;
