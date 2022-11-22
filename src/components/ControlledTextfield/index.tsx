import { TextField, TextFieldProps, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

import React from 'react';

type ControlledTextfieldProps = {
  control: any;
  name: string;
  textFieldProps?: TextFieldProps;
};

const ControlledTextfield: React.FC<ControlledTextfieldProps> = ({
  control,
  name,
  textFieldProps,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <TextField
          {...field}
          {...textFieldProps}
          error={!!errors[name]}
          // TODO: descobrir como resolver esse erro de ts
          // @ts-ignore: Unreachable code error
          helperText={errors[name]?.message || undefined}
        />
      )}
      {...rest}
    />
  );
};

export default ControlledTextfield;
