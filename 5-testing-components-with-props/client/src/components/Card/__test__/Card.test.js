import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
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

  it('should show the name of a cat', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByRole('heading', { name: cardProps.name })).toBeInTheDocument();
  });

  it('should show the phone number', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(cardProps.phone)).toBeInTheDocument();
  });

  it('should show the email', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(cardProps.email)).toBeInTheDocument();
  });

  it('should have an image and that src for image is correct', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByAltText(cardProps.image.alt).src).toBe(cardProps.image.url);
  });

  it('should show outlined heart', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByAltText('outlined heart')).toBeInTheDocument();
    expect(screen.queryByAltText('filled heart')).not.toBeInTheDocument();
  });

  it('should show filled heart', () => {
    render(<Card {...cardProps} isFavoured={true} />);
    expect(screen.queryByAltText('outlined heart')).not.toBeInTheDocument();
    expect(screen.getByAltText('filled heart')).toBeInTheDocument();
  });

  it('should toggle heart status', () => {
    render(<Card {...cardProps} />);

    userEvents.click(screen.getByRole('button'));
    expect(screen.queryByAltText('outlined heart')).not.toBeInTheDocument();
    expect(screen.getByAltText('filled heart')).toBeInTheDocument();

    userEvents.click(screen.getByRole('button'));
    expect(screen.getByAltText('outlined heart')).toBeInTheDocument();
    expect(screen.queryByAltText('filled heart')).not.toBeInTheDocument();
  });
});