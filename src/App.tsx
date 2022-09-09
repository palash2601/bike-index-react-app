import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';

import BikesListPage from './pages/BikesListPage';

const BikeDetailsPage = React.lazy(() => import('./pages/BikeDetailsPage'));

function App() {
  return (
    <div className="App">
      <header className="App-header">Bike index app</header>
      <section className="App-container">
        <Routes>
          <Route path="/" element={<BikesListPage />} />
          <Route
            path="bike/:id"
            element={
              <Suspense fallback={<p>...loading...</p>}>
                <ErrorBoundary>
                  <BikeDetailsPage />
                </ErrorBoundary>
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
