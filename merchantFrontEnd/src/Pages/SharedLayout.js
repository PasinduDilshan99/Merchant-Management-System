import React from 'react'
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'
import { Outlet } from 'react-router-dom'

const SharedLayout = () => {
  return (<>
   <Navbar/>
   <Outlet/>
   <Footer/>
  </>
  )
}

export default SharedLayout