import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CHAT, LOGIN } from './router/paths/Paths';
import PrivateRoute from './router/PrivateRoute';
import Login from './components/pages/Login/Login';
import Chat from './components/pages/Chat/Chat';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<div>Loading...</div>}><PrivateRoute /></Suspense>,
    children: [
      {
        path: CHAT,
        element: (<Suspense fallback={<div>Loading...</div>}><Chat /></Suspense>),
      },
    ],
  },
  {
    path: LOGIN,
    element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>,
  },
]);

function App() {

  return (<RouterProvider router={router} />);
}

export default App;
