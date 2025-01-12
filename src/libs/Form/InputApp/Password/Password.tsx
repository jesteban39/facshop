import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import type { InputPasswordProps } from '../types';
import Button from '@mui/material/Button';

const IconApp = ({ name }: { name: string }) => <>{name[0]}</>;

export const InputPassword = (props: InputPasswordProps) => {
  const { onChange, name, autoComplete, placeholder, value, onFocus, onBlur } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <InputBase
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value ?? ''}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={({ target }) => onChange(target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Button onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? <IconApp name='open' /> : <IconApp name='lock' />}
      </Button>
    </>
  );
};
