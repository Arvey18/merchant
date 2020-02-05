import {SEARCH} from '../actions/search';

const initialState: any = {
  text: '',
};

export default function(state: object = initialState, action: any = null) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
}
