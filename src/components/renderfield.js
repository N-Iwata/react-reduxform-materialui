import React from "react";
import TextField from "@material-ui/core/TextField";

import Select from "@material-ui/core/Select";

export const RenderField = (props) => {
  const {
    input,
    label,
    type,
    disabled,
    meta: { touched, error },
  } = props;

  let isError = false;
  if (touched) {
    isError = error === undefined ? false : true;
  }

  return (
    <TextField
      {...input}
      type={type}
      error={isError}
      helperText={touched && error}
      variant="outlined"
      required
      fullWidth
      disabled={disabled}
      label={label}
    />
  );
};

export const RenderSelect = (props) => {
  const {
    input: { value, onChange },
    onFieldChange,
    children,
    label,
  } = props;

  return (
    <Select
      required
      fullWidth
      variant="outlined"
      value={value}
      label={label}
      onChange={(e) => {
        onChange(e.target.value);
        onFieldChange && onFieldChange(e.target.value);
      }}
    >
      {children}
    </Select>
  );
};
