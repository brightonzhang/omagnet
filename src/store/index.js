import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import log from "../utils/log";
import reducers from "../reducers";

const middlewares = [thunk];

if (log.getLevel() <= log.levels.DEBUG) {
  const logger = createLogger({
    level: "log" // 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
  });

  middlewares.push(logger);
}

const store = createStore(reducers, compose(applyMiddleware(...middlewares)));

export default store;
