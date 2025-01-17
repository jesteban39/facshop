// InputPassword.test.tsx

import { fireEvent, render, screen } from '@testing-library/react';
import { InputPassword } from './Password';

describe('InputPassword component', () => {
  const mockOnChange = jest.fn();

  it('renders with initial value', () => {
    render(
      <InputPassword
        onChange={mockOnChange}
        name='password'
        value='myPassword'
        placeholder='Enter password'
        autoComplete='off'
        type={'password'}
        htmlref={undefined}
      />
    );
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByDisplayValue('myPassword')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(
      <InputPassword
        onChange={mockOnChange}
        name='password'
        placeholder='Enter password'
        autoComplete='off'
        type={'password'}
        htmlref={undefined}
      />
    );
    const input = screen.getByPlaceholderText('Enter password');

    fireEvent.change(input, { target: { value: 'newPassword' } });
    expect(mockOnChange).toHaveBeenCalledWith('newPassword');
  });

  it('toggles password visibility', () => {
    render(
      <InputPassword
        onChange={mockOnChange}
        name='password'
        value='myPassword'
        placeholder='Enter password'
        autoComplete='off'
        type={'password'}
        htmlref={undefined}
      />
    );
    const button = screen.getByRole('button');

    expect(screen.getByDisplayValue('myPassword')).toHaveAttribute('type', 'password');

    fireEvent.click(button);
    expect(screen.getByDisplayValue('myPassword')).toHaveAttribute('type', 'text');

    fireEvent.click(button);
    expect(screen.getByDisplayValue('myPassword')).toHaveAttribute('type', 'password');
  });
});
