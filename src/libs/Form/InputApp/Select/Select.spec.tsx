// Select.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InputSelect } from './Select';

describe('InputSelect component', () => {
  const mockOnChange = jest.fn();
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ];

  it('renders with placeholder and options', () => {
    render(
      <InputSelect
        onChange={mockOnChange}
        options={options}
        placeholder='Select an option'
        name='input-select'
        type='select'
        htmlref={undefined}
      />
    );

    expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    render(
      <InputSelect
        onChange={mockOnChange}
        options={options}
        placeholder='Select an option'
        name='input-select'
        type='select'
        htmlref={undefined}
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    fireEvent.mouseDown(select);
    const option = screen.getAllByRole('option')[1];
    expect(option).toBeInTheDocument();
    fireEvent.click(option);
    expect(mockOnChange).toHaveBeenCalledWith('2');
    fireEvent.click(screen.getByTestId('CloseIcon'));
    expect(select).toHaveValue('');
  });

  it('displays the selected value', () => {
    render(
      <InputSelect
        onChange={mockOnChange}
        value='2'
        options={options}
        placeholder='Select an option'
        name={''}
        type={'select'}
      />
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('Option 2');
  });
});
