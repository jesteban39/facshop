import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { InputSelectProps } from '../types';

export const InputSelect = (props: InputSelectProps) => {
  const { onChange, value, options, name, disabled, ...rest } = props;

  return (
    <Autocomplete
      fullWidth
      disablePortal
      autoComplete
      id={name}
      disabled={disabled}
      options={options}
      onChange={(_, data) => onChange(data?.value ?? '')}
      renderInput={(params) => {
        if (value && options.length > 0 && !params.inputProps.value) {
          params.inputProps.value = options.find((o) => o.value === value)?.label;
        }
        return <TextField name={name} {...rest} {...params} type={'text'} />;
      }}
    />
  );
};
