import { putAjax, getAjax, postAjax } from "../utils/ajax";
import * as Path from "../constants/path";
import * as Constants from "../constants/homeConstants";

export const getAllArticles = () => {
  return (dispatch: any, getState: Function) => {
    return getAjax(Path.getAllArticles).then((result: any) => {
      dispatch({
        type: Constants.GET_ARTICLES,
        articles: result.data
      });
    });
  };
};

export const getMyArticles = userId => {
  return (dispatch: any, getState: Function) => {
    return getAjax(Path.getMyArticles, { userId }).then((result: any) => {
      dispatch({
        type: Constants.GET_ARTICLES,
        articles: result.data
      });
    });
  };
};
