import React, { createContext, useReducer, useEffect } from 'react';

import * as firebase from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import * as actionTypes from '../store/actions';
import accountReducer from '../store/accountReducer';

import config from '../config';
import { IAuth } from 'types';

if (!firebase.getApps().length) {
  firebase.initializeApp(config);
}

const FirebaseContext = createContext<IAuth | null>(null);

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  uid: null,
};

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(
    () =>
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          dispatch({
            type: actionTypes.LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                id: user.uid,
                email: user.email,
                name: user.displayName || 'test',
                photoURL: user.photoURL,
                uid: user.uid,
              },
            },
          });
        } else {
          dispatch({
            type: actionTypes.LOGOUT,
          });
        }
      }),
    [dispatch],
  );

  const firebaseGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          const { user } = result;
          // rm unused error
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error.customData;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // rm unused error
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const logout = () => {
    getAuth().signOut();
  };

  // if (state.isInitialized !== undefined && !state.isInitialized) {
  //     return <Loader />;
  // }

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        firebaseGoogleSignIn,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export default FirebaseContext;
