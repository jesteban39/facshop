import Layout, {metadata} from '@/app/layout';
import Home from '@/app/page';
import {render, screen} from '@testing-library/react';

describe('Home', () => {
  it('should render successfully', () => {
    render(
      <Layout>
        <Home />
      </Layout>
    );
    const text = screen.getByText('Nexora');
    expect(text).toBeTruthy();
  });
  it('export metadata', () => {
    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBeDefined();
  });
});
