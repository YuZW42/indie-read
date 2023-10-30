import React from 'react'
import "./module.home.css"
import {BsArrowDown} from "react-icons/bs"

export const LandingPage = () => {
  return (
    <div className='hero-section'>
        <div className='hero-info'>
            <header>
                Welcome to
            </header>
            <main>
                Book Art Logo
            </main>
            <p>&lt;a tag line here&gt;</p>
        </div>
        <a href=""><BsArrowDown className='hero-arrow'/></a>
    </div>
  )
}
