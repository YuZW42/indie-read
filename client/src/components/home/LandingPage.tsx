// import React from 'react'
import "./module.home.css"
import {BsArrowDown} from "react-icons/bs"

export const LandingPage = () => {
  function scrollRemainingTo100vh() {
    const currentScrollY = window.scrollY;
  
    const remainingDistance = window.innerHeight - (currentScrollY % window.innerHeight);
  
    window.scroll({
      top: currentScrollY + remainingDistance,
      left: 0,
      behavior: 'smooth', 
    });
  }
  
  
  return (
    <div className='hero-section'>
        <div className='hero-info'>
            <header>
                Welcome to
            </header>
            <main>
                Indie Art Reads
            </main>
            <p>&lt;a tag line here&gt;</p>
        </div>
        <a onClick={scrollRemainingTo100vh} className="pe-auto"><BsArrowDown className='hero-arrow'/></a>
    </div>
  )
}
