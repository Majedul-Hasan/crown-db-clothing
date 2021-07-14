import ShopActionTyps from "./shop.typs";

// import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";



export const updateCollections = collectionMap =>({
   type: ShopActionTyps.UPDATE_COLLECTIONS,
   payload: collectionMap
})


export const fatchCollectionsStart = () =>({
   type: ShopActionTyps.FETCH_COLLECTIONS_START
   
})


export const fatchCollectionsSuccess =  collectionMap =>({
   type: ShopActionTyps.FETCH_COLLECTIONS_SUCCESS,
   payload: collectionMap
})

export const fatchCollectionsFailure =  errorMessage =>({
   type: ShopActionTyps.FETCH_COLLECTIONS_FAILURE,
   payload: errorMessage
})


/*
// thunk code
export const fatchCollectionsStartAsync = () =>{
   return dispatch =>{
      const collectionRef = firestore.collection('collections');
      dispatch(fatchCollectionsStart())




      collectionRef.get().then(snapshot =>{
         const collectionMap = convertCollectionsSnapshotToMap(snapshot);
         dispatch(fatchCollectionsSuccess(collectionMap))
         
      }).catch(error=> dispatch(fatchCollectionsFailure(error.message)))

   }
}
*/