import {SHOW_PROGRESS, PROGRESS_VALUE} from '../actions/api-call-progress';

const initialState = {
  show: false,
  progress: 50,
};

export default function(state: object = initialState, action: any = null) {
  switch (action.type) {
    case SHOW_PROGRESS:
      return {
        ...state,
        show: action.show,
      };
    case PROGRESS_VALUE:
      return {
        ...state,
        progress: action.progress,
      };
    default:
      return state;
  }
}
