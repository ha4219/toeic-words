export interface IUser {
  id: string;
  email: string;
  name: string;
  photoURL: string;
  uid: string;
}

export interface IAuth {
  isLoggedIn: boolean;
  isInitialized: boolean;
  user: null | IUser;
  uid: null | IUser;
  firebaseGoogleSignIn: any;
  logout: any;
}
