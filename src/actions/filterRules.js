import {
  FETCH_FILTER_RULES_REQUEST,
  FETCH_FILTER_RULES_SUCCESS,
  FETCH_FILTER_RULES_FAILURE
} from "../constants/actionTypes";

import magnetwConfig from "../vendor/magnetw/config";

export function fetchFilterRules() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_FILTER_RULES_REQUEST });

      //fetching
      const response = await fetch(magnetwConfig.ruleUrl);

      //response
      const data = await response.json();

      //   console.log(data);

      //dispatch end fetch action
      return dispatch({
        type: FETCH_FILTER_RULES_SUCCESS,
        data
      });
    } catch (error) {
      console.error(error);

      return dispatch({
        type: FETCH_FILTER_RULES_FAILURE,
        error
      });
    }
  };
}
