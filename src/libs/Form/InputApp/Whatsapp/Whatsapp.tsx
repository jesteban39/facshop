import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import type { InputWhatsappProps } from '../types';

export const InputWhatsapp = (props: InputWhatsappProps) => {
  const { onChange, value, name, ...rest } = props;
  return (
    <Grid container>
      <Grid>
        <Autocomplete
          fullWidth
          disablePortal
          autoComplete
          id={name}
          options={[{ label: 'Option 1', value: '1' }]}
          // onChange={(_, data) => onChange(data?.value ?? '')}
          renderInput={(params) => {
            // if (value && options.length > 0 && !params.inputProps.value) {
            //   params.inputProps.value = options.find((o) => o.value === value)?.label;
            // }
            return <TextField name={name} {...rest} {...params} type={'text'} />;
          }}
        />
      </Grid>
      <Grid>
        <InputBase
          value={value ?? ''}
          {...rest}
          type='text'
          inputMode='tel'
          onChange={({ target: { value } }) => onChange(value.replace(/\D/gi, ''))}
        />
      </Grid>
    </Grid>
  );
};
