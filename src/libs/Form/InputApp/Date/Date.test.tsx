// Date.test.tsx

import { fireEvent, render, screen } from '@testing-library/react';
import { InputDate } from './Date';

describe('InputDate component', () => {
  const mockOnChange = jest.fn();

  it('renders with initial value', () => {
    render(
      <InputDate
        name='date-input'
        onChange={mockOnChange}
        value='2023-09-23'
        type='date'
        placeholder={''}
        htmlref={undefined}
      />
    );
    const input = screen.getByDisplayValue('2023-09-23');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    render(
      <InputDate
        name='date-input'
        onChange={mockOnChange}
        type='date'
        placeholder={''}
        htmlref={undefined}
      />
    );

    const input = screen.getByDisplayValue('');

    fireEvent.change(input, { target: { value: '2023-10-01' } });
    expect(mockOnChange).toHaveBeenCalledWith('2023-10-01');
  });
});
