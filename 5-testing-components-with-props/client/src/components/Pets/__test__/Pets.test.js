import { screen, render } from "@testing-library/react";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import catsMock from '../../../mocks/cats.json';

import Pets from '../Pets';

const server = setupServer(
  rest.get("http://localhost:4000/cats", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catsMock));
  })
);

beforeAll(() => {
  server.listen();
})

afterEach(() => {
  server.resetHandlers();
})

afterAll(() => {
  server.close();
})

describe('Pets', () => {
  beforeEach(() => {
    render(<Pets />);
  })

  it('should render 5 cards', async () => {
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(5);
  });
});