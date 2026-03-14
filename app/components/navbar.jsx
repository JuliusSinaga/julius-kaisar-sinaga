// shortcut: rafc
import Image from 'next/image'
import React from 'react'

const navbar = () => {
  return (
    <>
      <nav>
        <a href="">
            <image src={assets.logo} className='w-8/12 cursor-pointer mr-14'/>         
        </a>
        <ul>
            <li><a href="#top">home</a></li>
            <li><a href="#top">About Me</a></li>
            <li><a href="#top">Service</a></li>
            <li><a href="#top">Contact Me</a></li>
        </ul>
      </nav>
    </>
  )

}

export default navbar
