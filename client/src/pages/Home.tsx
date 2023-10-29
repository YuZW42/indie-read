// import React from 'react'
import { DisplayArtwork } from "../components/home/DisplayArt"
import { Header } from "../components/shared/Header"
import NavBar from "../components/shared/NavBar"

export const Home = () => {
  return (
    <>
      <Header/>
      <NavBar/>
      <DisplayArtwork/>
    </>
  )
}
