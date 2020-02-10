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
      dispatch({ type: SEARCH_MAGNETS_REQUEST });

      console.log({ rule, keyword });

      const current = makeupSearchOption({ rule, keyword });
      const { originalCount, items } = await obtainSearchResult(current);

      console.log(items);

      return dispatch({
        type: SEARCH_MAGNETS_SUCCESS,
        data: items
      });
    } catch (error) {
      console.error(error);

      return dispatch({
        type: SEARCH_MAGNETS_FAILURE,
        error
      });
    }
  };
}
