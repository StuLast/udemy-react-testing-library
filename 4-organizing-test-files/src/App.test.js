import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

const email = "test@test.com";
const password = "testing";
const confirmPassword = "testing"

const emailError = /The email you input is invalid/i;
const passwordLengthError = /The password length needs to be 5 characters or more/i;
const passwordMatchError = /Passwords do not match/i;

const typeIntoForm = ({email, password, confirmPassword}) => {
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");

  if(email) {
    userEvent.type(emailInputElement, email);
  }

  if(password) {
    userEvent.type(passwordInputElement, password);
  }

  if(confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement
  };
};

const clickSubmit = () => {
  const submitBtnElement = screen.getByRole("button", { name: "submit" });
  userEvent.click(submitBtnElement);
}

describe('App component interaction ...', () => {
  beforeEach(() => {
    render(<App />)
  });
  
  afterEach(() => {
    cleanup();
  });

  describe(' ... handles inputs ...', () => {
    it('should show empty inputs initially', () => {
      const form = typeIntoForm({});

      expect(form.emailInputElement.value).toBe("");
      expect(form.passwordInputElement.value).toBe("");
      expect(form.confirmPasswordInputElement.value).toBe("");
    });

    it('should accept input into email field', () => {
      const form = typeIntoForm({email});
      expect(form.emailInputElement.value).toBe(email);
    });

    it('should accept a password into the password field', () => {
      const form = typeIntoForm({password});
      expect(form.passwordInputElement.value).toBe(password);
    });

    it('should accept a confirmation password into the confirm password field', () => {
      const form = typeIntoForm({confirmPassword});
      expect(form.confirmPasswordInputElement.value).toBe(confirmPassword);
    });
  });

  describe("... error handling ...", () => {
    it('should reject an invalid email input and show error', () => {
      expect(screen.queryByText(emailError)).not.toBeInTheDocument();

      const form = typeIntoForm({email: 'notValidEmail'});
      clickSubmit();

      expect(screen.queryByText(emailError)).toBeInTheDocument();
    })

    it('should show an error if password has less than 5 characters, but correct email', () => {

      expect(screen.queryByText(emailError)).not.toBeInTheDocument();
      expect(screen.queryByText(passwordLengthError)).not.toBeInTheDocument();

      const form = typeIntoForm({email, password: 'aaaa', confirmPassword});
      clickSubmit();

      expect(screen.queryByText(emailError)).not.toBeInTheDocument();
      expect(screen.queryByText(passwordLengthError)).toBeInTheDocument();
    });

    it('should show an error if passwords dont match, but email is correct', () => {

      expect(screen.queryByText(emailError)).not.toBeInTheDocument();
      expect(screen.queryByText(passwordLengthError)).not.toBeInTheDocument();
      expect(screen.queryByText(passwordMatchError)).not.toBeInTheDocument();

      typeIntoForm({email, password, confirmPassword: 'notgood'});
      clickSubmit();

      expect(screen.queryByText(emailError)).not.toBeInTheDocument();
      expect(screen.queryByText(passwordLengthError)).not.toBeInTheDocument();
      expect(screen.queryByText(passwordMatchError)).toBeInTheDocument();
    });
  });

  describe('... succesful transaction ...', () => {
    it('should show no errors if a correct email, password and confirm password are submitted', () => {

      typeIntoForm({email, password, confirmPassword});
      clickSubmit();

      expect(screen.queryByText(emailError)).not.toBeInTheDocument();
      expect(screen.queryByText(passwordLengthError)).not.toBeInTheDocument();
      expect(screen.queryByText(passwordMatchError)).not.toBeInTheDocument();
    });
  });

})
