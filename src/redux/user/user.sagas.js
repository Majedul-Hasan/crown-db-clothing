import {takeLatest, put, all, call } from 'redux-saga/effects'

import UserActionTypes  from './user.types'


import {auth, googleProvider, createUserProfileDocument, getCurrentUser} from '../../firebase/firebase.utils'

// import { googleSignInSuccess, googleSignInFailure, emailSignInSuccess, emailSignInFailure } from "./user.actions";
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from "./user.actions";



export function* getSnapshotFromUserAuth(userAuth, additionalData){
   try{
    const useRef = yield call(createUserProfileDocument, userAuth, additionalData)
      const userSnapshot = yield useRef.get()
      yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
      
   }catch(error){
      yield put(signInFailure(error))

   }
}

export function* signInWithGoogle(){
   try {
      const {user} = yield auth.signInWithPopup(googleProvider)
      // console.log(useRef);
   //    const useRef = yield call(createUserProfileDocument, user)
   //    const userSnapshot = yield useRef.get()
   //    yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
         yield getSnapshotFromUserAuth(user)
      
   }catch(error){
      yield put(signInFailure(error))

   }
}


export function* signInWithEmail({payload:{email, password} }){
   try {
      const {user} = yield auth.signInWithEmailAndPassword(email, password)
      // console.log(useRef);
      // const useRef = yield call(createUserProfileDocument, user)
      // const userSnapshot = yield useRef.get()
      // yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
      yield getSnapshotFromUserAuth(user)

      
   }catch(error){
      yield put(signInFailure(error))

   }
}

export function* isUserAuthrnticated(){
   try {
      const userAuth = yield getCurrentUser();
      if(!userAuth) return;
      yield getSnapshotFromUserAuth(userAuth)
      
   } catch (error) {
      yield put(signInFailure(error))
   }
}

export function* signOut(){ //signOut generator function
   try {
      yield auth.signOut();
      yield put(signOutSuccess())
   } catch (error) {
      yield put(signOutFailure(error))
   }

}
export function* signUp({payload: {email, password, displayname}}){ //signUp generator function
   try {
      const {user} = yield auth.createUserWithEmailAndPassword(
         email,
         password
      );
      yield put(signUpSuccess({user, additionalData:{displayname}}))   
      
   } catch (error) {
      yield put(signUpFailure(error))
   }

}

export function* signInAftrSignUp({payload: {user, additionalData}}){ //signInAftrSignUp generator function
   yield getSnapshotFromUserAuth(user, additionalData )

}


export function* onGoogleSignInStart(){
   yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)

}
export function* onEmailSignInStart(){
   yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)

}


export function* onCheckUserSession(){
   yield takeLatest( UserActionTypes.CHECK_USER_SESSION, isUserAuthrnticated)
}

export function* onSignOutStart(){
   yield takeLatest( UserActionTypes.SIGN_OUT_START, signOut)
}


export function* onSignUpStart(){
   yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess(){
   yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAftrSignUp)
}


export function* userSaga(){
   yield all(
      [
         call(onGoogleSignInStart),
          call(onEmailSignInStart), 
          call(isUserAuthrnticated),
          call(onSignOutStart),
          call(onSignUpStart),
          call(onSignUpSuccess)
      ]
   )
}