import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

beforeEach(() => {
  render(<App />)
});

afterEach(() => {
  cleanup();
});

it('should show empty inputs initially', () => {
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

it('should accept input into email field', () => {
  const userMail = "test@test.com";
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  userEvent.type(emailInputElement, userMail);
  expect(emailInputElement.value).toBe(userMail);
});

it('should accept a password into the password field', () => {
  const password = "Password!321";
  const passwordInputElement = screen.getByLabelText("Password");
  userEvent.type(passwordInputElement, password);
  expect(passwordInputElement.value).toBe(password);
});

it('should accept a confirmation password into the confirm password field', () => {
  const password = "Password!321";
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");
  userEvent.type(confirmPasswordInputElement, password);
  expect(confirmPasswordInputElement.value).toBe(password);
});

it('should reject an invalid email input and show error', () => {
  const userEmail = 'notavalidemail';

  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const submitBtnElement = screen.getByRole("button", { name: "submit" });
  const emailErrorElement = screen.queryByText("The email you input is invalid");
  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, userEmail);
  userEvent.click(submitBtnElement);
  const emailErrorElementWithError = screen.queryByText("The email you input is invalid");

  expect(emailErrorElementWithError).toBeInTheDocument();
})

it('should show an error if password has less than 5 characters, but correct email', () => {
  const userEmail = "test@test.com";
  const password = "test";

  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  const submitBtnElement = screen.getByRole("button", { name: "submit" });
  const emailErrorElement = screen.queryByText(/The email you input is invalid/i);
  const passwordErrorElement = screen.queryByText(/The password length needs to be 5 characters or more/i);

  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, userEmail);
  userEvent.type(passwordInputElement, password);

  userEvent.click(submitBtnElement);

  const emailErrorElementWithError = screen.queryByText(/The email you input is invalid/i);
  const passwordErrorElementWithError = screen.queryByText(/The password length needs to be 5 characters or more/i);

  expect(emailErrorElementWithError).not.toBeInTheDocument();
  expect(passwordErrorElementWithError).toBeInTheDocument();

});

it('should show an error if passwords dont match, but email is correct', () => {
  const userEmail = "test@test.com";
  const password = "testing";
  const passwordConfirm = "nottesting"

  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  const passwordConfirmElement = screen.getByLabelText("Confirm Password");
  const submitBtnElement = screen.getByRole("button", { name: "submit" });
  const emailErrorElement = screen.queryByText(/The email you input is invalid/i);
  const passwordErrorElement = screen.queryByText(/The password length needs to be 5 characters or more/i);
  const passwordConfirmErrorElement = screen.queryByText(/Passwords do not match/i);

  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(passwordConfirmErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, userEmail);
  userEvent.type(passwordInputElement, password);
  userEvent.type(passwordConfirmElement, passwordConfirm);

  userEvent.click(submitBtnElement);

  const emailErrorElementWithError = screen.queryByText(/The email you input is invalid/i);
  const passwordErrorElementWithError = screen.queryByText(/The password length needs to be 5 characters or more/i);
  const passwordConfirmErrorElementWithError = screen.queryByText(/Passwords do not match/i);

  expect(emailErrorElementWithError).not.toBeInTheDocument();
  expect(passwordErrorElementWithError).not.toBeInTheDocument();
  expect(passwordConfirmErrorElementWithError).toBeInTheDocument();

});

it('should show no errors if a correct email, password and confirm password are submitted', () => {
  const userEmail = "test@test.com";
  const password = "testing";
  const passwordConfirm = "testing";

  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  const passwordConfirmElement = screen.getByLabelText("Confirm Password");
  const submitBtnElement = screen.getByRole("button", { name: "submit" });

  userEvent.type(emailInputElement, userEmail);
  userEvent.type(passwordInputElement, password);
  userEvent.type(passwordConfirmElement, passwordConfirm);

  userEvent.click(submitBtnElement);

  const emailErrorElementSubmitted = screen.queryByText(/The email you input is invalid/i);
  const passwordErrorElementSubmitted = screen.queryByText(/The password length needs to be 5 characters or more/i);
  const passwordConfirmErrorElementSubmitted = screen.queryByText(/Passwords do not match/i);

  expect(emailErrorElementSubmitted).not.toBeInTheDocument();
  expect(passwordErrorElementSubmitted).not.toBeInTheDocument();
  expect(passwordConfirmErrorElementSubmitted).not.toBeInTheDocument();
});
