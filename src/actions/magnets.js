import {
  SEARCH_MAGNETS_REQUEST,
  SEARCH_MAGNETS_SUCCESS,
  SEARCH_MAGNETS_FAILURE
} from "../constants/actionTypes";

import {
  makeupSearchOption,
  obtainSearchResult
} from "../vendor/magnetw/repository";

export function searchMagnet({ rule, keyword }) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SEARCH_MAGNETS_REQUEST, id: rule.id });

      console.log({ name: rule.name, keyword });
      const current = makeupSearchOption({ rule, keyword });
      const { originalCount, items } = await obtainSearchResult(current);

      return dispatch({
        type: SEARCH_MAGNETS_SUCCESS,
        id: rule.id,
        data: items
      });
    } catch (error) {
      console.log(error.toString());

      return dispatch({
        type: SEARCH_MAGNETS_FAILURE,
        id: rule.id,
        error: error.toString()
      });
    }
  };
}
