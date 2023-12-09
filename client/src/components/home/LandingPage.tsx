import heroBtn from "../../assets/opening_desktop-02.png"

import "./module.home.css"
// import {BsArrowDown} from "react-icons/bs"

export const LandingPage = () => {
  // function scrollRemainingTo100vh() {
  //   const currentScrollY = window.scrollY;
  
  //   const remainingDistance = window.innerHeight - (currentScrollY % window.innerHeight);
  
  //   window.scroll({
  //     top: currentScrollY + remainingDistance,
  //     left: 0,
  //     behavior: 'smooth', 
  //   });
  // }
  
  return (
    <div className='hero-section'>
        <img src={heroBtn} alt="" />
        {/* <div className='hero-info'>
            <header>
                Welcome to
            </header>
            <main>
                Indie Art Reads
            </main>
            <p>
              Building a Community-Powered World of Art Book Wonders
            </p>
        </div>
        <a onClick={scrollRemainingTo100vh} className="pe-auto"><BsArrowDown className='hero-arrow'/></a> */}
    </div>
  )
}
