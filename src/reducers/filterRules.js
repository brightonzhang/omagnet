import {
  FETCH_FILTER_RULES_REQUEST,
  FETCH_FILTER_RULES_SUCCESS,
  FETCH_FILTER_RULES_FAILURE
} from "../constants/actionTypes";

import defaultRules from "../../assets/data/rules.json";

const initialState = {
  isFetching: false,
  data: defaultRules,
  error: ""
};

export default function filterRules(state = initialState, action) {
  switch (action.type) {
    case FETCH_FILTER_RULES_REQUEST:
      return { ...state, isFetching: true };

    case FETCH_FILTER_RULES_SUCCESS:
      return { ...state, isFetching: false, data: action.data };

    case FETCH_FILTER_RULES_FAILURE:
      return { ...state, isFetching: false, error: action.error };

    default:
      return state;
  }
}
