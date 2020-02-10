import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import reducers from "../reducers";

const logger = createLogger({
  level: "log" // 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
});
const middlewares = compose(applyMiddleware(thunk,  logger));
const store = createStore(reducers, middlewares);

export default store;
