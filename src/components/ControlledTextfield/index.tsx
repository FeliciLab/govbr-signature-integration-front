import { TextField, TextFieldProps } from '@mui/material';
import { Controller, Control, FieldValues } from 'react-hook-form';

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
      render={({ field }) => <TextField {...field} {...textFieldProps} />}
      {...rest}
    />
  );
};

export default ControlledTextfield;
