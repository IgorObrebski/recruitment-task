import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='header'>
      <span>Igor Obrębski</span>
      <button className='btn'>
        <Link to='/form' className='link'>
          formularz rejestracyjny
        </Link>
      </button>
    </div>
  );
};

export default Header;
