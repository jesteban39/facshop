import { fireEvent, render, screen } from '@testing-library/react';
import type { Control, ControllerFieldState } from 'react-hook-form';
import { InputApp } from './index';
import { InputAppProps } from './types';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: ({ render, name }: any) => {
    const field = {
      onChange: jest.fn(),
      value: name ? 'test' : undefined,
      ref: jest.fn()
    };

    const fieldState: ControllerFieldState = {
      invalid: false,
      isTouched: false,
      isDirty: false,
      error: {
        type: 'required',
        message: 'Field is required'
      },
      isValidating: false
    };
    return render({
      field,
      fieldState
    });
  }
}));

describe('InputApp', () => {
  const defaultProps: InputAppProps = {
    name: 'input-app',
    placeholder: 'Enter a text',
    icon: 'icon',
    control: {} as Control,
    rules: {},
    label: 'Label test'
  };

  it('renders InputText by default', () => {
    render(<InputApp type='text' {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it("renders InputSelect when type is 'select'", () => {
    render(<InputApp type='select' {...defaultProps} options={[]} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it("renders InputNumber when type is 'number'", () => {
    render(<InputApp type='number' {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it("renders InputPassword when type is 'password'", () => {
    const { container } = render(<InputApp type='password' {...defaultProps} />);
    const input = container.querySelector("input[type='password']");
    expect(input).toBeInTheDocument();
  });

  it("renders InputDate when type is 'date'", () => {
    const { container } = render(<InputApp type='date' {...defaultProps} />);
    const input = container.querySelector("input[type='date']");
    expect(input).toBeInTheDocument();
  });

  it("renders InputWhatsapp when type is 'whatsapp'", () => {
    render(<InputApp type='whatsapp' {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  // it("renders InputSwitch when type is 'switch'", () => {
  //   render(<InputApp type='switch' {...defaultProps} />);
  //   expect(screen.getByRole('checkbox')).toBeInTheDocument();
  // });

  it('displays error message when error exists', () => {
    render(<InputApp type='whatsapp' {...defaultProps} name='' />);
    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });

  it('calls onChange handler with the correct value', async () => {
    render(<InputApp {...defaultProps} />);
    const inputText = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputText, { target: { value: '' } });
    expect(inputText.value).toBe('test');
  });

  it('calls onChange handler with the correct value', async () => {
    render(<InputApp {...defaultProps} onChange={jest.fn()} />);
    const inputText = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputText, { target: { value: '' } });
    expect(inputText.value).toBe('test');
  });
});
