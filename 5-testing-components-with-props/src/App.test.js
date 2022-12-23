import { cleanup, render, screen } from '@testing-library/react';
import App from './App';


beforeEach(() => {
  render(<App />);
})

afterEach(() => {
  cleanup();
});

test('renders container', () => {
  const linkElement = screen.getByText(/App Component/i);
  expect(linkElement).toBeInTheDocument();
});
