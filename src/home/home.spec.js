import React from 'react';
import { render } from '@testing-library/react';
import { Home } from './home';

describe('Home', () => {
  it('renders correctly', () => {
    const wrapper = render(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
})
