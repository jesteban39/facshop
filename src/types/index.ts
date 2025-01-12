import type { FormNames } from '@/constants';
import lang from '@/Translation/locales/es.json';
import type { Path } from 'react-hook-form';
import type { User } from './User';

export type RulesKeys = Path<typeof lang.rules>;
export type IconsKeys = keyof typeof lang.icons;
export type ErrorKeys = keyof typeof lang.errors;

export type Option = {
  label: string;
  value: string;
};

export type TypeModel<T> = T extends FormNames.user ? User : never;
