// Number.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { InputNumber } from './Number';

describe('InputNumber component', () => {
  const mockOnChange = jest.fn();

  it('renders with initial value', () => {
    render(
      <InputNumber
        onChange={mockOnChange}
        value='12345'
        name={''}
        placeholder={''}
        type={'number'}
        htmlref={undefined}
      />
    );
    expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
  });

  it('calls onChange with only numeric values', () => {
    render(
      <InputNumber
        onChange={mockOnChange}
        name={''}
        placeholder={''}
        type={'number'}
        htmlref={undefined}
      />
    );
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'abc123' } });
    expect(mockOnChange).toHaveBeenCalledWith('123');
  });
});
