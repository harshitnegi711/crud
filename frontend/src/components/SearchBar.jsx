import React from 'react'

const SearchBar = ({ searchText, setSearchText, placeholder }) => {
  return (
    <div className='search-bar-div relative'>
      <i className='pi pi-search absolute'></i>
      <input value={searchText} onChange={(e) => { setSearchText(e.target.value) }} type='text' placeholder={placeholder} />
    </div>
  )
}


export default SearchBar
