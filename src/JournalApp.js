import React from "react";
import { Provider } from "react-redux";
import { AppRouter } from "./routers/AppRouter";
import { store } from "./store/store";

export const JournalApp = () => {
  return (
    // We are providing the store by a context
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
