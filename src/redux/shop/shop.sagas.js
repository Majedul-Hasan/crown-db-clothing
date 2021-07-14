// import { takeEvery } from "@redux-saga/core/effects";
// import { takeEvery, call, put } from "redux-saga/effects";
import { takeLatest, call, put, all } from "redux-saga/effects";


import {firestore, convertCollectionsSnapshotToMap   } from "../../firebase/firebase.utils";

import { 
   fatchCollectionsFailure,
   fatchCollectionsSuccess


 } from "./shop.action";

import ShopActionTyps from "./shop.typs";


export function* fetchColloctionsAsync(){
   // yield console.log('I am fired');

   try{

   const collectionRef = firestore.collection('collections');
   const  snapshot = yield collectionRef.get();
   const  collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
   yield put(fatchCollectionsSuccess(collectionsMap))

   }catch (error){
      yield put(fatchCollectionsFailure(error.message))

   }
}


export function* fetchColloctionsStart(){
   yield takeLatest(
      ShopActionTyps.FETCH_COLLECTIONS_START,
      fetchColloctionsAsync
   )
}

export function* shopSagas(){
   yield all(
      [
      call(fetchColloctionsStart)
      ]
   )
}