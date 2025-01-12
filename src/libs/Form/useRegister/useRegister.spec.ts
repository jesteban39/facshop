import { act, renderHook } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { useLocale, useTranslations } from '@/Translation';
import { FormNames } from '@/constants';
import { useRegister } from '@/libs/Form';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn()
}));

jest.mock('../../../Translation', () => ({
  useLocale: jest.fn(),
  useTranslations: jest.fn()
}));

describe('useRegister hook', () => {
  const mockSetValue = jest.fn();
  const mockTrigger = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockGetRules = jest.fn();

  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      setValue: mockSetValue,
      watch: jest.fn(),
      clearErrors: jest.fn(),
      setError: jest.fn(),
      control: {},
      trigger: mockTrigger,
      handleSubmit: mockHandleSubmit
    });
    (useLocale as jest.Mock).mockReturnValue('en');
    (useTranslations as jest.Mock).mockImplementation(
      (key: string) => (x: string) => `${key}.${x}`
    );
  });

  it('should initialize with default values and set the correct rules', () => {
    const defaultValues = { field1: 'value1', field2: 'value2' };
    renderHook(() =>
      useRegister({
        getRules: mockGetRules,
        formName: FormNames.user,
        defaultValues
      })
    );

    expect(mockSetValue).toHaveBeenCalledWith('field1', 'value1');
    expect(mockSetValue).toHaveBeenCalledWith('field2', 'value2');
  });

  it('should call setValue for each field when reset is called', () => {
    const defaultValues = { field1: 'value1', field2: 'value2' };
    const { result } = renderHook(() =>
      useRegister({
        getRules: mockGetRules,
        formName: FormNames.user,
        defaultValues
      })
    );

    act(() => {
      result.current.reset();
    });

    expect(mockSetValue).toHaveBeenCalledWith('field1', 'value1');
    expect(mockSetValue).toHaveBeenCalledWith('field2', 'value2');
  });

  it('should return correct values for register', () => {
    mockGetRules.mockReturnValue({
      field1: { required: true }
    });

    const { result } = renderHook(() =>
      useRegister({
        getRules: mockGetRules,
        formName: FormNames.user
      })
    );

    const registerResult = result.current.register('field1');

    expect(registerResult.name).toBe('field1');
    expect(registerResult.rules).toEqual({ required: true });
    expect(registerResult.label).toBe('user.label.field1');
    expect(registerResult.placeholder).toBe('user.placeholder.field1');
  });
  it('should call setValue correctly for array defaultValues', () => {
    const defaultValues = [
      { field1: 'value1', field2: 'value2' },
      { field3: 'value3', field4: 'value4' }
    ];
    const { result } = renderHook(() =>
      useRegister({
        getRules: mockGetRules,
        formName: FormNames.user,
        defaultValues
      })
    );

    act(() => {
      result.current.reset();
    });

    expect(mockSetValue).toHaveBeenCalledWith('0.field1', 'value1');
    expect(mockSetValue).toHaveBeenCalledWith('0.field2', 'value2');
    expect(mockSetValue).toHaveBeenCalledWith('1.field3', 'value3');
    expect(mockSetValue).toHaveBeenCalledWith('1.field4', 'value4');
  });
});
