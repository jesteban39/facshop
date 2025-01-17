import InputBase from '@mui/material/InputBase';
import type { InputTextProps } from '../types';

export const InputText = (props: InputTextProps) => {
  const { onChange, value, disablePaste, transforms, ...rest } = props;
  return (
    <InputBase
      fullWidth
      value={value ?? ''}
      {...rest}
      onChange={({ target: { value } }) => {
        const transformList = Array.isArray(transforms) ? transforms : [transforms];
        const newValue = transformList.reduce((acc, transform) => {
          if (transform === 'upper') return acc.toUpperCase();
          if (transform === 'lower') return acc.toLowerCase();
          if (transform === 'numeric') return acc.replace(/\D/g, '');
          if (transform === 'trim') return acc.trim();
          if (transform === 'trimStart') return acc.trimStart();
          if (transform === 'trimEnd') return acc.trimEnd();
          if (typeof transform === 'function') return transform(acc);
          if (typeof transform === 'object' && 'limit' in transform) {
            return acc.slice(0, transform.limit);
          }
          return acc;
        }, value);
        onChange(newValue);
      }}
      onPaste={(e) => {
        if (disablePaste) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    />
  );
};
