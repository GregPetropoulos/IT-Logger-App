//*STYLES
import '../src/assets/styles.css';
import 'materialize-css/dist/css/materialize.min.css';
import  React,{ lazy } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';

//For render deployment,disables devtools in prod mode
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
if (process.env.NODE_ENV === 'production') disableReactDevTools();

// * COMPONENTS LAZY LOADED
const Landing = lazy(() => import('../src/components/layout/Landing'));
const Home = lazy(() => import('../src/components/layout/Home'));

// import Alerts from './components/layout/Alerts';
const Login = lazy(() => import('../src/components/auth/Login'));
const Register = lazy(() => import('../src/components/auth/Register'));
const About = lazy(() => import('../src/components/layout/About'));
const PrivateRoute = lazy(() => import('../src/components/routing/PrivateRoute'));
const NotFound = lazy(() => import('../src/components/layout/NotFound'));
const Techs = lazy(() => import('./components/tech/Techs'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/techs' element={<Techs />} />
      <Route path='/about' element={<About />} />
      <Route path='/home' element={<PrivateRoute component={Home} />} />
      <Route path='/*' element={<NotFound />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
