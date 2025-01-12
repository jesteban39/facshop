import type { IconsKeys, RulesKeys } from '@/types';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch
} from 'react-hook-form';

export type Register<T extends FieldValues> = (x: Path<T>) => {
  name: Path<T>;
  control: Control<T, any>;
  rules: { [x in keyof T]: RegisterOptions }[Path<T>];
  label: string;
  icon: IconsKeys;
  defaultValue?: any;
  placeholder: string;
};

export type Watch<T extends FieldValues> = UseFormWatch<T>;

export type SetValue<T extends FieldValues> = UseFormSetValue<T>;

export type UseRegisterReturn<T extends FieldValues> = {
  register: Register<T>;
  reset: () => void;
  watch: Watch<T>;
  setValue: SetValue<T>;
  clearErrors: UseFormClearErrors<T>;
  setError: UseFormSetError<T>;
  trigger: UseFormTrigger<T>;
  handleSubmit: UseFormHandleSubmit<T, undefined>;
};

type Rules<T> = Record<keyof T, RegisterOptions>;
type Replace = Record<string, string | number>;
export type GetRules<T extends FieldValues> = (
  getText: (s: RulesKeys, o?: Replace) => string,
  trigger: UseFormTrigger<T>
) => Rules<T>;
