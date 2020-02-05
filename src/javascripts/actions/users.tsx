import {API, USERS} from '../constant/api';
import {SHOW_PROGRESS, PROGRESS_VALUE} from '../actions/api-call-progress';
import axios from 'axios';

export const GET_USER = (id: number) => (dispatch: any) => {
  dispatch(SHOW_PROGRESS(true));
  axios({
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
      if (response.status === 200 && response.data.length > 0) {
        response.data.map((value: any, key: number) => {
          if (value.id === id) {
            dispatch({
              type: GET_USER,
              data: value,
            });
          }
          return false;
        });
      }
    })
    .catch(error => {
      dispatch(SHOW_PROGRESS(false));
      dispatch(PROGRESS_VALUE(0));
      console.log(error);
    });
};
