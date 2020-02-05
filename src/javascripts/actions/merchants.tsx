import {API, MERCHANTS} from '../constant/api';
import {SHOW_PROGRESS, PROGRESS_VALUE} from '../actions/api-call-progress';
import axios from 'axios';

export const GET_MERCHANTS = () => (dispatch: any) => {
  dispatch(SHOW_PROGRESS(true));
  axios({
    method: 'get',
    url: MERCHANTS,
    baseURL: API,
    headers: {
      'Content-Type': 'application/json',
    },
    onUploadProgress: function(progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      dispatch(PROGRESS_VALUE(percentCompleted));
    },
  })
    .then(response => {
      dispatch(SHOW_PROGRESS(false));
      dispatch(PROGRESS_VALUE(0));
      if (response.status === 200 && response.data.length > 0) {
        dispatch({
          type: GET_MERCHANTS,
          data: response.data,
        });
      }
    })
    .catch(error => {
      dispatch(SHOW_PROGRESS(false));
      dispatch(PROGRESS_VALUE(0));
      console.log(error);
    });
};

export const DELETE_MERCHANT = (id: number) => (
  dispatch: any,
  getState: any
) => {
  dispatch({
    type: DELETE_MERCHANT,
    id: id,
    state: getState(),
  });
};

export const ADD_MERCHANT = (data: Object) => (
  dispatch: any,
  getState: any
) => {
  dispatch({
    type: ADD_MERCHANT,
    data: data,
    state: getState(),
  });
};

export const UPDATE_MERCHANTS = (data: Object) => (
  dispatch: any,
  getState: any
) => {
  dispatch({
    type: UPDATE_MERCHANTS,
    data: data,
    state: getState(),
  });
};

export const SEARCH_MERCHANTS = (text: string) => (
  dispatch: any,
  getState: any
) => {
  dispatch({
    type: SEARCH_MERCHANTS,
    text: text,
    state: getState(),
  });
};
