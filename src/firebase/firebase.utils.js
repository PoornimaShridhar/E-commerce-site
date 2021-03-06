import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD7zlpQvYQQ1ntoS5ed9Ct9SXAp0iH0k3U",
    authDomain: "crwn-db-dc5e3.firebaseapp.com",
    projectId: "crwn-db-dc5e3",
    storageBucket: "crwn-db-dc5e3.appspot.com",
    messagingSenderId: "85895864504",
    appId: "1:85895864504:web:c7d69a61b39a7e1941144d",
    measurementId: "G-HXDEVMWTJF"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch (error) {
          console.log("error creating user", error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
