import { combineReducers } from "redux";
import postReducer from "./posts";
import userReducer from "./user";
import commonReducer from "./common";
export default combineReducers({
  commonReducer,
  postReducer,
  userReducer,
});
