import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import { AppRouter } from './components';
import { Provider } from 'react-redux/es/exports';
import { setupStore } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = setupStore()

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);
