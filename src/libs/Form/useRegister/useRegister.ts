import { FormNames } from '@/constants';
import { useLocale, useTranslations } from '@/Translation';
import type { IconsKeys } from '@/types';
import { useEffect, useMemo } from 'react';
import type { FieldValues, Path } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { GetRules, UseRegisterReturn } from './types';

type UseRegisterProps<T extends FieldValues> = {
  getRules: GetRules<T>;
  formName: FormNames;
  defaultValues?: Partial<T>;
};

/**
 * Wrapper for useForm
 * @param {Object} props Object containing defaultValues, formName, and getRules functions
 * @returns Object containing register, reset, watch, setValue, and handleSubmit functions
 */
export function useRegister<T extends FieldValues>(
  props: UseRegisterProps<T>
): UseRegisterReturn<T> {
  const { defaultValues, formName, getRules } = props;
  const locale = useLocale();
  const t = useTranslations(formName);
  const tRules = useTranslations('rules');
  const { setValue, watch, clearErrors, setError, control, trigger, handleSubmit } =
    useForm<T>({
      mode: 'onChange',
      reValidateMode: 'onChange'
    });

  const rules = useMemo(() => getRules(tRules, trigger), [locale]);

  const reset = () => {
    if (defaultValues) {
      if (Array.isArray(defaultValues)) {
        defaultValues.forEach((item, i) => {
          Object.entries(item).forEach(([key, value]) =>
            setValue(`${i}.${key}` as Path<T>, value as any)
          );
        });
      } else {
        Object.entries(defaultValues).forEach(([key, value]) =>
          setValue(key as Path<T>, value)
        );
      }
    }
  };

  useEffect(reset, [defaultValues]);

  const register = (x: Path<T>) => {
    return {
      control,
      name: x,
      rules: rules[x],
      label: t(`label.${x}`),
      icon: '' as IconsKeys,
      //  t(`icon.${x}`) as IconsKeys,
      placeholder: t(`placeholder.${x}`)
    };
  };
  return {
    register,
    reset,
    watch,
    setValue,
    setError,
    trigger,
    handleSubmit,
    clearErrors
  };
}
