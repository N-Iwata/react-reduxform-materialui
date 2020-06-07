import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { select } from "./select";
import { change } from "./change";

export default combineReducers({
  select,
  change,
  form,
});
