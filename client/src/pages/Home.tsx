// import React from 'react'
// import { DisplayArtwork } from "../components/home/DisplayArt"

import {DisplayFilteredBooks} from "../components/home/DisplayFilteredBooks"
import ImageSlider from "../components/home/ImageSlider"
import { LandingPage } from "../components/home/LandingPage"
import { Footer } from "../components/shared/Footer"
import { Header } from "../components/shared/Header"

export const Home = () => {
  return (
    <>
      <LandingPage/>
      <Header/>
      <ImageSlider/>
      <DisplayFilteredBooks/>
      {/* <DisplayArtwork/> */}
      <Footer/>
    </>
  )
}
