import { cleanup, render, screen } from '@testing-library/react';
import Card from '../Card';

const cardProps = {
  email: 'test@test.com',
  image: {
    url: 'https://unsplash.com/photos/ZCHj_2lJP00',
    alt: 'cute kitty'
  },
  isFavoured: false,
  name: 'Sydney',
  phone: '111-111-1111',
}

describe('Testing the card component', () => {

  beforeEach(() => {
    render(
      <Card
        {...cardProps}
      />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should show the name of a cat', () => {
    expect(screen.getByRole('heading', { name: cardProps.name })).toBeInTheDocument();
  });

  it('should show the phone number', () => {
    expect(screen.getByText(cardProps.phone)).toBeInTheDocument();
  });

  it('should show the email', () => {
    expect(screen.getByText(cardProps.email)).toBeInTheDocument();
  });


})