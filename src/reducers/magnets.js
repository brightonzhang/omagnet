import {
  SEARCH_MAGNETS_REQUEST,
  SEARCH_MAGNETS_SUCCESS,
  SEARCH_MAGNETS_FAILURE
} from "../constants/actionTypes";

import {
  SEARCH_INIT,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from "../constants/searchStatus";

const initialState = {
  status: SEARCH_INIT,
};

export default function magnets(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MAGNETS_REQUEST:
      return { ...state, status: SEARCH_REQUEST, [action.id]: [] };

    case SEARCH_MAGNETS_SUCCESS:
      return { ...state, status: SEARCH_SUCCESS, [action.id]: action.data };

    case SEARCH_MAGNETS_FAILURE:
      return { ...state, status: SEARCH_FAILURE };

    default:
      return state;
  }
}
