import { CHANGE_PROFILE } from "../actions";

export const change = (events = {}, action) => {
  switch (action.type) {
    case CHANGE_PROFILE:
      return action.response.data;
    default:
      return events;
  }
};
