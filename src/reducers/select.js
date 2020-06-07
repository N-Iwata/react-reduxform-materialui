import { GET_SELECT_DATA } from "../actions";

export const select = (events = {}, action) => {
  switch (action.type) {
    case GET_SELECT_DATA:
      return action.response.data;
    default:
      return events;
  }
};
