import config from './config';
import * as firebase from 'firebase/app';
import { getDocs, getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';

const app = firebase.initializeApp(config);

export const db = getFirestore(app);

export const addData = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), data);
    return docRef;
  } catch (e) {
    console.error(e);
  }
};

export const readData = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot;
};

export const updateData = async (data: any) => {
  return;
};
