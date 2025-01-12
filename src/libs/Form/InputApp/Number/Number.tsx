import InputBase from '@mui/material/InputBase';
import type { InputNumberProps } from '../types';

export const InputNumber = (props: InputNumberProps) => {
  const { onChange, value, ...rest } = props;
  return (
    <InputBase
      value={value ?? ''}
      inputMode='numeric'
      {...rest}
      type='text'
      onChange={({ target: { value } }) => onChange(value.replace(/\D/gi, ''))}
    />
  );
};
