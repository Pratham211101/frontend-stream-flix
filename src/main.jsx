
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './Pages/index';
import { AuthLayout,LogoutBtn,Navbar, SideBar } from './components/index.js';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './Pages/Home';
import Video from './Pages/Video';
import Signup from './Pages/SignupPage';
import VidUploadPage from './Pages/VidUploadPage';
import MainLayout from './Layouts/MainLayout';
import AuthLayoutPage from './Layouts/AuthLayoutPage';
import Subscriptions from './components/Subscriptions';
import History from './components/history';
import Playlists from './components/Playlists';
import YourVideos from './components/YourVideos';
import WatchLater from './components/WatchLater';
import LikedVideos from './components/LikedVideos';
import Settings from './components/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // ✅ Contains Navbar
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'video/:categoryId/:videoId',
        element: <Video />
      },
      {
        path: 'video/:id',
        element: <Video />
      },
      {
        path: 'upload-video',
        element: <VidUploadPage />
      },
      {
        path:'subscriptions',
        element:<Subscriptions/>

      },
      {
        path:'history',
        element:<History/>
      },{
        path:'playlists',
        element:<Playlists/>

      },{
        path:"your-videos",
        element:<YourVideos/>
      },{
        path:'watch-later',
        element:<WatchLater/>
      },{
        path:'liked-videos',
        element:<LikedVideos/>
      },{
        path:'settings',
        element:<Settings/>
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayoutPage />, // ❌ No Navbar
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
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

