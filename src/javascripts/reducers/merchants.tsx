import {
  GET_MERCHANTS,
  DELETE_MERCHANT,
  SEARCH_MERCHANTS,
  UPDATE_MERCHANTS,
  ADD_MERCHANT,
} from '../actions/merchants';
import * as _ from 'lodash';

const initialState: any = {
  merchants: [],
};

export default function(state: object = initialState, action: any = null) {
  // variables
  const current_data = JSON.parse(localStorage.getItem('merchants') || '[]');

  switch (action.type) {
    case GET_MERCHANTS:
      localStorage.setItem('merchants', JSON.stringify(action.data));
      return {
        ...state,
        merchants: action.data,
      };
    case SEARCH_MERCHANTS:
      let new_data_search = [];
      if (action.text === '') {
        new_data_search = current_data;
      } else {
        new_data_search = _.filter(current_data, (value: any) => {
          return value.name.toLowerCase().includes(action.text.toLowerCase());
        });
      }
      return {
        ...state,
        merchants: new_data_search,
      };
    case ADD_MERCHANT:
      current_data.unshift(action.data);
      localStorage.setItem('merchants', JSON.stringify(current_data));
      return {
        ...state,
        merchants: current_data,
      };
    case UPDATE_MERCHANTS:
      const index = _.findIndex(current_data, {
        id: action.data.id,
      });
      current_data[index] = action.data;
      localStorage.setItem('merchants', JSON.stringify(current_data));
      return {
        ...state,
        merchants: current_data,
      };
    case DELETE_MERCHANT:
      const new_data_state_delete = _.remove(
        action.state.merchants.merchants,
        (value: any) => {
          return value.id !== action.id;
        }
      );
      const new_data_delete = _.remove(current_data, (value: any) => {
        return value.id !== action.id;
      });
      localStorage.setItem('merchants', JSON.stringify(new_data_delete));
      return {
        ...state,
        merchants: new_data_state_delete,
      };
    default:
      return state;
  }
}
