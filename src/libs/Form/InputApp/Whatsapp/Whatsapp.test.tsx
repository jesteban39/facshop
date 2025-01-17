import { fireEvent, render, screen } from '@testing-library/react';
import { InputWhatsappProps } from '../types';
import { InputWhatsapp } from './Whatsapp';

describe('InputWhatsapp', () => {
  const mockOnChange = jest.fn();
  const defaultProps: InputWhatsappProps = {
    type: 'whatsapp',
    name: 'input-text',
    onChange: mockOnChange,
    placeholder: 'Enter a text'
  };

  it('renders the component correctly', () => {
    render(<InputWhatsapp {...defaultProps} />);
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onChange with only numeric characters', () => {
    render(<InputWhatsapp {...defaultProps} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '123abc456' } });
    expect(mockOnChange).toHaveBeenCalledWith('123456');
  });

  it('renders with the provided value', () => {
    render(<InputWhatsapp {...defaultProps} value='123456' />);
    expect(screen.getByRole('textbox')).toHaveValue('123456');
  });
});
