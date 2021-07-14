// import SHOP_DATA from './shop.data';

import ShopActionTyps from './shop.typs'

const INITIAL_STATE = {
  // collections: SHOP_DATA
  collections: null,
  isFetching: false,
  errorMessage: undefined

};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTyps.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true

      }
    case ShopActionTyps.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload

      }

    case ShopActionTyps.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload


      }

    // case ShopActionTyps.UPDATE_COLLECTIONS:
    //   return {
    //     ...state,
    //     collections: action.payload

    //   }
    default:
      return state;
  }
};

export default shopReducer;
