import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/notes";
import { JournalScreen } from "../components/journal/JournalScreen";
import { firebase } from "../firebase/firebaseConfig";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();

  //Video 250. Wait to Firebase to know if the user is authenticated or not
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //This function returns an Observable and checks if the user is logged in
    firebase.auth().onAuthStateChanged(async (user) => {
      //Check if user is authenticated to load his data
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid));
      } else setIsLoggedIn(false);

      setChecking(false);
    });
    //Without any dependency [] will trigger the effect only once
    //We are adding the dispatch to remove a warning in the browser
  }, [dispatch, setChecking, setIsLoggedIn]);

  return (
    <Router>
      <div>
        <Switch>
          {/* <Route path="/auth" component={AuthRouter} />
          <Route exact path="/" component={JournalScreen} /> */}
          <PublicRoute
            isAuthenticated={isLoggedIn}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            isAuthenticated={isLoggedIn}
            exact
            path="/"
            component={JournalScreen}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
