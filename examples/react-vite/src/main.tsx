import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import List1 from './routes/list1/index.tsx';
import Detail from './routes/detail/index.tsx';
import List2 from './routes/list2/index.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/list1',
        element: <List1 />,
      },
      {
        path: '/list2',
        element: <List2 />,
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
    <RouterProvider router={router} />
  </StrictMode>
);
