import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
import { useSelector } from "react-redux";

const TextfieldUI = ({ name, ...otherProps }) => {
  const { isDarkMode } = useSelector((state) => state.user);
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    size: "small",
    sx: {
      color: isDarkMode ? "white" : "rgba(0, 0, 0, 0.87)", // Text color for input and label
      "& .MuiOutlinedInput-input": {
        color: isDarkMode ? "white" : "rgba(0, 0, 0, 0.87)", // Input text color
        caretColor: isDarkMode ? "white" : "rgba(0, 0, 0, 0.87)", // Caret (cursor) color
        "&::placeholder": {
          color: isDarkMode
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.54)", // Placeholder text color
        },
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: isDarkMode ? "white" : "rgba(0, 0, 0, 0.23)", // Border color for the input field
        },
        "&:hover fieldset": {
          borderColor: isDarkMode ? "white" : "rgba(0, 0, 0, 0.23)", // Border color on hover
        },
        "&.Mui-focused fieldset": {
          borderColor: isDarkMode ? "white" : "rgba(0, 0, 0, 0.87)", // Border color when focused
        },
      },
      "& .MuiInputLabel-root": {
        color: isDarkMode ? "white" : "rgba(0, 0, 0, 0.54)", // Label text color
      },
    },
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <TextField {...configTextfield} />;
};

export default TextfieldUI;
