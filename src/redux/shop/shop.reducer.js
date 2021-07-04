// import SHOP_DATA from './shop.data';

import ShopActionTyps from './shop.typs'

const INITIAL_STATE = {
  // collections: SHOP_DATA
  collections: null

};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTyps.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload

      }
    default:
      return state;
  }
};

export default shopReducer;
