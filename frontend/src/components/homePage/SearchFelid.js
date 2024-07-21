import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";

const SearchField = ({ search, onSearchChange }) => {
  const [searchItem, setSearchItem] = useState("");
  const [value, setValue] = useState("");

  const { isDarkMode } = useSelector((state) => state.user);

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
          InputLabelProps={{
            sx: {
              color: isDarkMode ? "#fff" : "rgba(0, 0, 0, 0.54)",
            },
          }}
          InputProps={{
            ...params.InputProps,
            type: "search",
            sx: {
              "& .MuiOutlinedInput-root": {
                color: isDarkMode ? "#fff" : "rgba(0, 0, 0, 0.87)",
                "& fieldset": {
                  borderColor: isDarkMode ? "#fff" : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor: isDarkMode ? "#fff" : "rgba(0, 0, 0, 0.87)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: isDarkMode ? "#fff" : "rgba(0, 0, 0, 0.87)",
                },
              },
            },
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: isDarkMode ? "#fff" : "rgba(0, 0, 0, 0.87)",
            },
            "& .MuiFormLabel-root": {
              color: isDarkMode ? "#fff" : "rgba(0, 0, 0, 0.54)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: `${isDarkMode ? "white" : ""}`,
            },
          }}
        />
      )}
    />
  );
};

export default SearchField;
