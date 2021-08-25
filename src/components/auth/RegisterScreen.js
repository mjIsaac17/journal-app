import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  //Get the current state that is shown in console (Redux dev tools)
  // const state = useSelector((state) => state);
  const { msgError } = useSelector((state) => state.ui);

  const initialFormValues = {
    name: "Isaac",
    email: "",
    password: "123456",
    password2: "123456",
  };
  const [formValues, handleInputChange] = useForm(initialFormValues);
  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Invalid name"));
      return false;
    }
    //npm i validator. This library includes multiple validations, one of them is to validate emails
    if (!validator.isEmail(email)) {
      dispatch(setError("Invalid email"));
      return false;
    }
    if (password !== password2) {
      dispatch(setError("Passwords do not match each other"));
      return false;
    }
    if (password < 6) {
      dispatch(setError("Password should be at least 6 characters"));
      return false;
    }
    dispatch(removeError());
    return true;
  };
  return (
    <div>
      <h3 className="auth__title">Register</h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          autoComplete="off"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link className="link" to="/auth/login">
          Already registerd?
        </Link>
      </form>
    </div>
  );
};
