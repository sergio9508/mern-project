import {POST_USER, CLEAN_USER} from "redux/actions/types";
const initialState = {
  data: {},
  success: false
}
export default function (state = initialState, action) {
  switch (action.type) {
    case POST_USER:
      return{
        ...state,
        data: action.data,
        success: action.success
      }
    case CLEAN_USER:
      return{
        ...state,
        data: {},
        success: false
      }
    default:
      return state;
  }
}