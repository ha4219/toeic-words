import FirebaseContext from '../contexts/FirebaseContext';
import React, { useContext } from 'react';
import './Layout.css';

function Layout({ children }: { children?: React.ReactElement }) {
  const auth = useContext(FirebaseContext);
  return (
    <div className="layout">
      <header>
        {auth?.user ? (
          <button onClick={auth.logout}>logout</button>
        ) : (
          <button onClick={auth?.firebaseGoogleSignIn}>login</button>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
