import React from 'react'
import LandingPage from './LandingPage'
import {Outlet} from "react-router-dom"
import Footer from '../../Components/Home/Footer'
export default function Master() {
  return (
    <>
     <Navbar setClickConnectWallet={setClickConnectWallet} />
    <Outlet/>
    <Footer/>
    </>
  )
}
