import React from 'react';
import logo from '../../logo-block.png';
import "./Navbar.css";

const Navbar = () =>  {

  return (
    <nav className="nav-bar">

        <img src={logo} className="logo" alt="logo-loopStudio" />

      <ul  className='navigation'>
        <li>
          <a href="#">About</a>
        </li>

        <li>
          <a href="#">Careers</a>
        </li>

        <li>
          <a href="#">Events</a>
        </li>

        <li>
          <a href="#">Products</a>
        </li>
        
        <li>
          <button className='btn'>Connect Wallet</button>
        </li>
      </ul>
      {/* <div className="toggle-menu" onClick={()=> setShow(!show)}></div> */}
    </nav>
  );
};

export default Navbar;

