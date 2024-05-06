/* eslint-disable no-undef */
/* eslint-disable mocha/no-mocha-arrows */
/* eslint-disable mocha/no-global-tests */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
