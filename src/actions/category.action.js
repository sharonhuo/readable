import { fetchCategories } from "../utils/api";

export const FETCH_CATEGORY = "fetch_category";

export const getAllCategories = () => { 
 return dispatch =>
    fetchCategories().then(categories =>
      dispatch({
        type: FETCH_CATEGORY,
        payload: categories
      })
    );
};
