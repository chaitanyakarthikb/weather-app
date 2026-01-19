import React from 'react'
import './Navbar.css'
import SearchBar from './SearchBar'

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1>Basva Weather Application</h1>
      <SearchBar/>
    </div>
  )
}

export default Navbar
