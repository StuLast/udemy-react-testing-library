import { render, screen } from '@testing-library/react';
import Cards from '../Cards';
import cats from '../../../mocks/cats.json';

describe('Cards', () => {
  it('should render 5 card components', () => {
    render(<Cards cats={cats} />);
    expect(screen.getAllByRole('article').length).toBe(5);
  });
});