import React from 'react';
import { Route, Routes } from 'react-router-dom';
import KoToEn from './pages/KoToEn';
import Layout from './components/Layout';
import { FirebaseProvider } from './contexts/FirebaseContext';

function App() {
  return (
    <FirebaseProvider>
      <Layout>
        <Routes>
          <Route index path="" element={<KoToEn />} />
        </Routes>
      </Layout>
    </FirebaseProvider>
  );
}

export default App;
