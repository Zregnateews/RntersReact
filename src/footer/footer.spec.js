import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer', () => {
  it('renders correctly', () => {
    const wrapper = render(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
})
