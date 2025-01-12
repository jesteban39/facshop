import { fireEvent, render, screen } from '@testing-library/react';
import { InputText } from './Text';
import type { InputTextProps } from '../types';
import * as React from 'react';

describe('InputText Component', () => {
  const mockOnChange = jest.fn();
  const defaultProps: InputTextProps = {
    type: 'text',
    name: 'input-text',
    onChange: mockOnChange,
    placeholder: 'Enter a text'
  };

  it('renders the input with the correct value', () => {
    render(<InputText {...defaultProps} value='Test Value' />);
    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  it('calls onChange handler with the correct value', () => {
    render(<InputText {...defaultProps} />);
    const inputText = screen.getByRole('textbox');
    fireEvent.change(inputText, { target: { value: 'Hello' } });
    expect(mockOnChange).toHaveBeenCalledWith('Hello');
  });

  it('applies the upper transformation correctly', () => {
    render(<InputText {...defaultProps} onChange={mockOnChange} transforms='upper' />);
    const inputText = screen.getByRole('textbox');
    fireEvent.change(inputText, { target: { value: 'hello' } });
    expect(mockOnChange).toHaveBeenCalledWith('HELLO');
  });

  it('applies the lower transformation correctly', () => {
    render(<InputText {...defaultProps} onChange={mockOnChange} transforms='lower' />);
    const inputText = screen.getByRole('textbox');
    fireEvent.change(inputText, { target: { value: 'HELLO' } });
    expect(mockOnChange).toHaveBeenCalledWith('hello');
  });

  it('applies the numeric transformation correctly', () => {
    render(<InputText {...defaultProps} onChange={mockOnChange} transforms='numeric' />);
    const inputText = screen.getByRole('textbox');
    fireEvent.change(inputText, { target: { value: 'abc123' } });
    expect(mockOnChange).toHaveBeenCalledWith('123');
  });

  it('apply multiple transformations correctly', () => {
    render(
      <InputText
        {...defaultProps}
        onChange={mockOnChange}
        transforms={['trim', 'trimStart', 'trimEnd', { limit: 7 }]}
      />
    );
    const inputText = screen.getByRole('textbox');
    fireEvent.change(inputText, { target: { value: ' abc dfg xyz ' } });
    expect(mockOnChange).toHaveBeenCalledWith('abc dfg');
  });

  it('applies custom transform function correctly', () => {
    const customTransform = jest.fn((value: string) => `custom-${value}`);
    render(
      <InputText {...defaultProps} onChange={mockOnChange} transforms={customTransform} />
    );
    const inputText = screen.getByRole('textbox');
    fireEvent.change(inputText, { target: { value: 'test' } });
    expect(customTransform).toHaveBeenCalledWith('test');
    expect(mockOnChange).toHaveBeenCalledWith('custom-test');
  });

  it('disables paste when disablePaste is true', () => {
    const pasteEvent = new Event('paste', {
      bubbles: true,
      cancelable: true
    });
    pasteEvent.preventDefault = jest.fn();
    render(<InputText {...defaultProps} disablePaste={true} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent(inputElement, pasteEvent);
    expect(pasteEvent.preventDefault).toHaveBeenCalled();
  });

  it('disables paste when disablePaste is true', () => {
    const pasteEvent = new Event('paste', {
      bubbles: true,
      cancelable: true
    });
    pasteEvent.preventDefault = jest.fn();
    render(<InputText {...defaultProps} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent(inputElement, pasteEvent);
    expect(pasteEvent.preventDefault).not.toHaveBeenCalled();
  });
});
