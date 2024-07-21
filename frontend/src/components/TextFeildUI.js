import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { useField } from "formik";
import { useSelector } from "react-redux";

const TextfieldUI = ({ name, icon, ...otherProps }) => {
  const { isDarkMode } = useSelector((state) => state.user);
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    size: "small",
    sx: {
      color: isDarkMode ? "white" : "rgba(0, 0, 0, 0.87)",
      "& .MuiOutlinedInput-input": {
        color: isDarkMode ? "white" : "rgba(0, 0, 0, 0.87)",
        caretColor: isDarkMode ? "white" : "rgba(0, 0, 0, 0.87)",
        "&::placeholder": {
          color: isDarkMode
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.54)",
        },
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: isDarkMode ? "white" : "rgba(0, 0, 0, 0.23)",
        },
        "&:hover fieldset": {
          borderColor: isDarkMode ? "white" : "rgba(0, 0, 0, 0.23)",
        },
        "&.Mui-focused fieldset": {
          borderColor: isDarkMode ? "white" : "rgba(0, 0, 0, 0.87)",
        },
      },
      "& .MuiInputLabel-root": {
        color: isDarkMode ? "white" : "rgba(0, 0, 0, 0.54)",
      },
    },
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <TextField
      {...configTextfield}
      InputProps={{
        endAdornment: icon ? (
          <InputAdornment position="end">{icon}</InputAdornment>
        ) : null,
      }}
    />
  );
};

export default TextfieldUI;
