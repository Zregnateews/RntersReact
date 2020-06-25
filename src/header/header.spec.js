import React from 'react';
import { render } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header } from './header';

configure({adapter: new Adapter()});

describe('Header', () => {
  it('renders correctly', () => {
    const wrapper = render(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
})
