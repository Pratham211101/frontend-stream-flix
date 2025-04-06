// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter, createBrowserRouter,RouterProvider } from 'react-router-dom'
// import { Login } from './Pages/index'
// import { AuthLayout } from './components/index.js'
// import { Provider } from 'react-redux'
// import store from './store/store'
// const router=createBrowserRouter([
//   {
//     path:"/",
//     element:<App/>,
//     children:[
//       {
//         path:"/",
//         element:<App/>
//       },
//       {
//         path:"/login",
//         element:(
//           <AuthLayout authentication={false}>
//             <Login/>
//           </AuthLayout>
//         )
//       }
//     ]
//   }
  
// ])
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </StrictMode>,
// )
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './Pages/index';
import { AuthLayout } from './components/index.js';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './Pages/Home';
import Video from './Pages/Video';
import Signup from './Pages/SignupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'video/:catgeoryId/:videoId',
        element: <Video />
      },
      {
        path: 'login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: 'signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

