export const SEARCH = (text: string) => (dispatch: any) => {
  dispatch({
    type: SEARCH,
    text: text,
  });
};
