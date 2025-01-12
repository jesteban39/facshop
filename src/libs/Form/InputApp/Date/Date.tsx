import InputBase from '@mui/material/InputBase';
import type { InputDateProps } from '../types';

export const InputDate = (props: InputDateProps) => {
  const { onChange, value, ...rest } = props;
  return (
    <InputBase
      onChange={({ target }) => onChange(target.value)}
      value={value ?? ''}
      inputMode='numeric'
      {...rest}
    />
  );
};
