import {GET_USER} from '../actions/users';

const initialState = {
  current_user: {},
};

export default function(state: object = initialState, action: any = null) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        current_user: action.data,
      };
    default:
      return state;
  }
}
