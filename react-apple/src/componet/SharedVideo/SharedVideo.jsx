import React from 'react'
import { Outlet } from 'react-router-dom'
import Youtube from '../Youtube/Youtube'

function SharedVideo() {
  return (
    <>
      <Outlet/>
      {/* <Youtube/> */}
    </>
  )
}

export default SharedVideo
