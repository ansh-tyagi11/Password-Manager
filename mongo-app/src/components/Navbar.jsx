import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <nav className='h-[10vh] bg-red-200 max-w-[100vw] overflow-visible'>
      <div className="flex items-center md:pl-[160px] md:ml-[5vw] justify-center md:justify-start">
        <img src={logo} alt="MyPasswordVault Logo" className='mt-[-36px] ml-[-30px] max-h-40 w-auto m-0' />
      </div>
    </nav>
  )
}

export default Navbar
