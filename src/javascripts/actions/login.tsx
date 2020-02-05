import {API, USERS} from '../constant/api';
import {SHOW_PROGRESS, PROGRESS_VALUE} from '../actions/api-call-progress';
import axios from 'axios';

export const LOGIN = (username: string, password: string) => (
  dispatch: any
) => {
  dispatch(SHOW_PROGRESS(true));
  return axios({
    method: 'get',
    url: USERS,
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
      return response;
    })
    .catch(error => {
      dispatch(SHOW_PROGRESS(false));
      dispatch(PROGRESS_VALUE(0));
      return error;
    });
};
