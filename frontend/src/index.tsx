import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

import './index.scss';
import App from '../src/App';
import ScrollToTop from './ScrollToTop';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop>
        <Provider store={store}>
          <App />
        </Provider>
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>,
);
