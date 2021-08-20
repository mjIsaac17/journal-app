import React from "react";
import { Link } from "react-router-dom";

export const RegisterScreen = () => {
  return (
    <div>
      <h3 className="auth__title">Register</h3>
      <form>
        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          autoComplete="off"
          name="name"
        />
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          autoComplete="off"
          name="email"
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password2"
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
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
