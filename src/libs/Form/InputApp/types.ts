import type { Control, RegisterOptions } from 'react-hook-form';
import type { IconsKeys, Option } from '@/types';
import { ReactEventHandler } from 'react';

type Autocomplete =
  | 'on'
  | 'off'
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level1'
  | 'address-level2'
  | 'address-level3'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension'
  | 'url'
  | 'photo';

type Transform =
  | 'upper'
  | 'lower'
  | 'numeric'
  | 'trim'
  | 'trimStart'
  | 'trimEnd'
  | { limit: number }
  | ((v: string) => string);

type InputAppBaseProps = {
  name: string;
  placeholder: string;
  autoComplete?: Autocomplete;
  disabled?: boolean;
  onFocus?: ReactEventHandler;
  onBlur?: ReactEventHandler;
};

type InputAppAddProps = {
  icon: IconsKeys;
  control: Control;
  rules: RegisterOptions;
  label: string;
  onChange?: (value: string, name: string) => void;
};

export type InputAppTextProps = InputAppBaseProps &
  InputAppAddProps & {
    type?: 'text';
    disablePaste?: boolean;
    transforms?: Transform | Transform[];
    inputMode?:
      | 'text'
      | 'decimal'
      | 'numeric'
      | 'search'
      | 'none'
      | 'tel'
      | 'email'
      | 'url';
  };

type InputAppNumberProps = InputAppBaseProps &
  InputAppAddProps & {
    type: 'number';
  };

type InputAppWhatsappProps = InputAppBaseProps &
  InputAppAddProps & {
    type: 'whatsapp';
  };

type InputAppPasswordProps = InputAppBaseProps &
  InputAppAddProps & {
    type: 'password';
  };

type InputAppSelectProps = InputAppBaseProps &
  InputAppAddProps & {
    type: 'select';
    options: Option[];
  };

type InputAppDateProps = InputAppBaseProps &
  InputAppAddProps & {
    type: 'date';
    min?: string;
    max?: string;
  };

type InputAppSwitchProps = InputAppBaseProps &
  InputAppAddProps & {
    type: 'switch';
  };

export type InputAppProps =
  | InputAppTextProps
  | InputAppNumberProps
  | InputAppWhatsappProps
  | InputAppPasswordProps
  | InputAppSelectProps
  | InputAppDateProps;

type InputAppControl = {
  htmlref?: any;
};

export type InputTextProps = Omit<InputAppTextProps, keyof InputAppAddProps> &
  InputAppControl & {
    onChange: (value: string) => void;
    value?: string;
  };

export type InputNumberProps = Omit<InputAppNumberProps, keyof InputAppAddProps> &
  InputAppControl & {
    onChange: (value: string) => void;
    value?: string;
  };

export type InputWhatsappProps = Omit<InputAppWhatsappProps, keyof InputAppAddProps> &
  InputAppControl & {
    onChange: (value: string) => void;
    value?: string;
  };

export type InputPasswordProps = Omit<InputAppPasswordProps, keyof InputAppAddProps> &
  InputAppControl & {
    onChange: (value: string) => void;
    value?: string;
  };

export type InputSelectProps = Omit<
  InputAppSelectProps,
  keyof InputAppAddProps | 'onChange'
> &
  InputAppControl & {
    onChange: (value: string | number) => void;
    value?: string;
  };

export type InputDateProps = Omit<InputAppDateProps, keyof InputAppAddProps> &
  InputAppControl & {
    onChange: (value: string | null) => void;
    value?: string | null;
  };
