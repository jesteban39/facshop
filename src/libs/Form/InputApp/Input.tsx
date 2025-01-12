'use client';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Controller } from 'react-hook-form';
import { InputDate } from './Date';
import { InputNumber } from './Number';
import { InputPassword } from './Password';
import { InputSelect } from './Select';
import { InputText } from './Text';
import type { InputAppProps } from './types';
import { InputWhatsapp } from './Whatsapp';

type Field = {
  onChange: (value: any) => void;
  value: any;
  htmlref?: any;
};

export const InputApp = (inputAppProps: InputAppProps) => {
  const { control, rules, label, ...props } = inputAppProps;

  const selectInput = (field: Field) => {
    switch (props.type) {
      case 'select':
        return <InputSelect {...props} {...field} />;
      case 'number':
        return <InputNumber {...props} {...field} />;
      case 'whatsapp':
        return <InputWhatsapp {...props} {...field} />;
      case 'password':
        return <InputPassword {...props} {...field} />;
      case 'date':
        return <InputDate {...props} {...field} />;
      default:
        return <InputText {...props} {...field} />;
    }
  };

  return (
    <Grid container>
      <Controller
        name={inputAppProps.name}
        rules={rules}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const field = { onChange, value };
          return (
            <>
              {/* <Typography variant='label' noWrap> */}
              <Typography noWrap>
                {/* <IconButton color='secondary' sx={{ p: 0, mr: '3px' }}>
                  <IconApp name={icon} />
                </IconButton> */}
                {label}
              </Typography>
              {selectInput(field)}
              {error && (
                // <Typography component='span' variant='rule'>
                <Typography component='span'>{String(error.message)}</Typography>
              )}
            </>
          );
        }}
      />
    </Grid>
  );
};
