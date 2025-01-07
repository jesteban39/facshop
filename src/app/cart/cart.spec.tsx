import { render } from '@testing-library/react';
import Cart from './page';

describe('Cart', () => {
  it('should render successfully', () => {
    const {container} = render(<Cart />);
    expect(container).toHaveTextContent('Cart');
  });
});
