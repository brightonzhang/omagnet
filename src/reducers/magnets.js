import {
  SEARCH_MAGNETS_REQUEST,
  SEARCH_MAGNETS_SUCCESS,
  SEARCH_MAGNETS_FAILURE
} from "../constants/actionTypes";

const initialState = {
  loading: false,
  data: []
};

export default function filterRules(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MAGNETS_REQUEST:
      return { ...state, loading: true };

    case SEARCH_MAGNETS_SUCCESS:
      return { ...state, loading: false, data: action.data };

    case SEARCH_MAGNETS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
}
