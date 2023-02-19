import React from 'react';
import { Route, Routes } from 'react-router-dom';
import KoToEn from './pages/KoToEn';
import Layout from './components/Layout';
import { FirebaseProvider } from './contexts/FirebaseContext';

function App() {
  return (
    <FirebaseProvider>
      <Layout>
        {/* <Routes>
          <Route index element={<KoToEn />} />
        </Routes> */}
        <KoToEn />
      </Layout>
    </FirebaseProvider>
  );
}

export default App;
