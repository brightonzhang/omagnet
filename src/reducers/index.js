import { combineReducers } from "redux";
import filterRules from "./filterRules";
import magnets from "./magnets";

const rootReducer = combineReducers({
  filterRules,
  magnets
});

export default rootReducer;
