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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
