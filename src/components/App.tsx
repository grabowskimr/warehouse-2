import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import RouteComponent from './Route';

const App: React.FC = () => {
  return (
    <div>
      <CookiesProvider>
        <BrowserRouter>
          <RouteComponent />
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
};

export default App;
