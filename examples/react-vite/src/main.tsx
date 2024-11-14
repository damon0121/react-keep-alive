import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import List from './routes/list/index.tsx';
import Detail from './routes/detail/index.tsx';
import KeepAlive from '../../../dist/index';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/list/:catId',
        element: <List />,
      },
      {
        path: '/detail/:id',
        element: <Detail />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KeepAlive needKeepAlivePaths={['/list/:id']}>
      <RouterProvider router={router} />
    </KeepAlive>
  </StrictMode>
);
