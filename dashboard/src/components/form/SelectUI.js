import React from "react";
import { useField, useFormikContext } from "formik";
import { MenuItem, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const SelectWrapper = ({ name, options, label, ...otherProps }) => {
  const { isDarkMode } = useSelector((state) => state.user);
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    onChange: handleChange,
    label: label,
    sx: {
      color: "white", // Text color for label and selected option
      "& .MuiOutlinedInput-input": {
        color: `${isDarkMode ? "white" : "black"}`, // Text color for input text
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: `${isDarkMode ? "white" : "black"}`, // Border color for the input field
        },
        "&:hover fieldset": {
          borderColor: `${isDarkMode ? "white" : "black"}`, // Border color on hover
        },
        "&.Mui-focused fieldset": {
          borderColor: `${isDarkMode ? "white" : "black"}`, // Border color when focused
        },
      },
      "& .MuiInputLabel-root": {
        color: `${isDarkMode ? "white" : "black"}`, // Label text color
      },
      "& .MuiSelect-icon": {
        color: `${isDarkMode ? "white" : "black"}`, // Dropdown icon color
      },
    },
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {options.map((item, pos) => (
        <MenuItem key={pos} value={item}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectWrapper;
