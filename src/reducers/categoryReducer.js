import { FETCH_CATEGORY } from "../actions/category.action";

const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return  {categories:action.payload};
    default:
      return state;
  }
};

export default categoryReducer;
