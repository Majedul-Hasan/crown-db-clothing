import ShopActionTyps from "./shop.typs";


export const updateCollections = collectionMap =>({
   type: ShopActionTyps.UPDATE_COLLECTIONS,
   payload: collectionMap
})