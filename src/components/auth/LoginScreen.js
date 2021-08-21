import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { removeError, setError } from "../../actions/ui";
import { useSelector } from "react-redux";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  //Get the current state that is shown in console (Redux dev tools)
  // const state = useSelector((state) => state);
  const { msgError, loading } = useSelector((state) => state.ui);
  const [formValues, handleInputChange] = useForm({
    email: "isaac@gmail.com",
    password: "123456",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isLoginFormValid()) dispatch(startLoginEmailPassword(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isLoginFormValid = () => {
    if (!validator.isEmail(email) || !password) {
      dispatch(setError("Invalid email or password"));
      return false;
    }
    dispatch(removeError());
    return true;
  };
  return (
    <div>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          autoComplete="off"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary btn-block"
        >
          Login {loading && <i className="fas fa-spinner fa-spin"></i>}
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link className="link" to="/auth/register">
          Create new account
        </Link>
      </form>
    </div>
  );
};
