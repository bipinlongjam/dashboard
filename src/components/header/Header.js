import React, { useState } from 'react'
import './Header.css'

const Header = ({handleAddWidget, handleSearch}) => {

  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchInputChange = (e) =>{
    setSearchTerm(e.target.value);
  }

  const handleSearchClick = () =>{
    handleSearch(searchTerm)
  }

  return (
    <div className="header-row">
        <div className="header-left">
          <h1 className='dash-title'>CNAPP Dashboard</h1>
        </div>
        <div className="header-right">
          <button className="btn add-widget-btn" onClick={handleAddWidget}>
            <span className="icon">Add Widget ➕</span>
          </button>
          <div className="reload-btn">
          🔄
          </div>
          <button className="btn options-btn">
            <span className="icon">⋮</span>
          </button>
          <select className="filter-select">
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
          <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name"
            onChange={handleSearchInputChange}
          />
          <button className="btn search-btn" onClick={handleSearchClick}>
            🔍
          </button>
        </div>
        </div>
      </div>
  )
}

export default Header
