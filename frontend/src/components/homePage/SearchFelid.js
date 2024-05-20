import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'

const SearchFelid = ({search, onSearchChange}) => {
  const[searchItem, setSearchItem] = useState("")
  const[value, setValue] = useState("")


  const searchHandler = (event, newValue) => {
    
    onSearchChange(newValue);
  };

  const inputChangeHandler = (event, newInputValue) => {
   
    onSearchChange(newInputValue);
  };





  return (
    <Autocomplete
    freeSolo
    onInputChange={inputChangeHandler}
      onChange={searchHandler}
    id="free-solo-2-demo"
    disableClearable
    options={search.map((option) => option.heading)}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Search Here"
        InputProps={{
          ...params.InputProps,
          type: 'search',
        }}
      />
    )}
  />
  )
}

export default SearchFelid