import React from "react";
import { Provider } from "react-redux";

import Store from "./src/store";
import AppContainer from "./src/navigation/AppContainer";

export default () => {
  return (
    <Provider store={Store}>
      <AppContainer />
    </Provider>
  );
};
