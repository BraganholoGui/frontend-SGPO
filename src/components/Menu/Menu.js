import './Header.css';
import ologo from '../static/Logo/5.png';
import React from 'react';


function HeaderInit(){
  return(
    <div className='menu0'>
      <h1>Site</h1>
      <div className="logo">
        <a href='https://stackoverflow.com'>Link Logo<img src={ologo} alt="Logo"/></a>
      </div>
    </div>
  )
    
}

export default HeaderInit;
