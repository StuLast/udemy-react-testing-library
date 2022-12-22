import { useState } from 'react';
import validator from 'validator';
import './App.css';

function App() {
  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSignupInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(signupInput.email)) {
      return setError("The email you input is invalid");
    }
    if (signupInput.password.length < 5) {
      return setError("The password length needs to be 5 characters or more");
    }
    if (signupInput.password !== signupInput.confirmPassword) {
      return setError("Passwords do not match");
    }

    setError("");
    console.log("Login Approved");
  }

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label
            className="form-label"
            htmlFor="email">
            Email Address
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={signupInput.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            className="form-label"
            htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={signupInput.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            className="form-label"
            htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="form-control"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={signupInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          {error && <p className="text-danger">{error}</p>}
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default App;
