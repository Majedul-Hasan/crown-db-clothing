import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCyauX6WAODVA67327uyrNT8HnNSII0KJg",
    authDomain: "crown-clothing-8c233.firebaseapp.com",
    databaseURL: "https://crown-clothing-8c233-default-rtdb.firebaseio.com",
    projectId: "crown-clothing-8c233",
    storageBucket: "crown-clothing-8c233.appspot.com",
    messagingSenderId: "169216582895",
    appId: "1:169216582895:web:9de39dd31f75f7872b271a"




  // apiKey: "AIzaSyCyauX6WAODVA67327uyrNT8HnNSII0KJg",
  // authDomain: "crown-clothing-8c233.firebaseapp.com",
  // projectId: "crown-clothing-8c233",
  // storageBucket: "crown-clothing-8c233.appspot.com",
  // messagingSenderId: "169216582895",
  // appId: "1:169216582895:web:2616bedcf770afd42b271a"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
    // const userRef = firestore.doc(`users/ldshfukhgn1544`);
  
  // const collectionRef = firestore.collection('users');
  // console.log(collectionRef);



  console.log(userRef);

  const snapShot = await userRef.get();
  console.log(snapShot);
  // console.log(snapShot.data());

  // const collectionSnapshot = await collectionRef.get()

  // console.log({collection: collectionSnapshot.docs.map(doc=>doc.data())}); //JSON data


  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
  const collectionRef = firestore.collection(collectionKey)
  // console.log(collectionRef);


  const batch = firestore.batch()

  objectsToAdd.forEach(obj=> {
    // const newDocRef= collectionRef.doc(obj.title)
    const newDocRef= collectionRef.doc()

    // console.log(newDocRef);
    batch.set(newDocRef, obj);


  })
  return await batch.commit()
}


export const convertCollectionsSnapshotToMap = collections =>{
  const transformdCollection = collections.docs.map(doc=>{
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  // console.log(transformdCollection);
  return transformdCollection.reduce((accumulator, collection)=>{
    accumulator[collection.title.toLowerCase()] =collection
    return  accumulator
  } , {})
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);



/****FOR REDUX SEGA CODE *****/

export const getCurrentUser =()=>{
  return new Promise((resolve, reject)=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}


/****FOR REDUX SEGA CODE *****/

export default firebase;
