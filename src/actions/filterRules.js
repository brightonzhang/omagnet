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

      const response = await fetch(magnetwConfig.ruleUrl);
      // console.log(JSON.stringify(response));
      if (response.status === 200) {
        const data = await response.json();

        return dispatch({
          type: FETCH_FILTER_RULES_SUCCESS,
          data
        });
      }

      throw new Error(`status: ${response.status}`);
    } catch (error) {
      console.log(error.toString());
      return dispatch({
        type: FETCH_FILTER_RULES_FAILURE,
        error: error.toString()
      });
    }
  };
}
