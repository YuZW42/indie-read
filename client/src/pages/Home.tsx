// import React from 'react'
import { DisplayArtwork } from "../components/home/DisplayArt"
import ImageSlider from "../components/home/ImageSlider"
import { LandingPage } from "../components/home/LandingPage"
import { Header } from "../components/shared/Header"
import NavBar from "../components/shared/NavBar"

export const Home = () => {
  return (
    <>
      <LandingPage/>
      <Header/>
      <ImageSlider/>
      <NavBar/>
      <DisplayArtwork/>
    </>
  )
}
