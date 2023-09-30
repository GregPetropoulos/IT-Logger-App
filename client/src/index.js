import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// * COMPONENTS
import App from './App';
import Landing from '../src/components/layout/Landing';
import Home from '../src/components/layout/Home';

// import Alerts from './components/layout/Alerts';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';
import About from '../src/components/layout/About';
import PrivateRoute from '../src/components/routing/PrivateRoute';
import NotFound from '../src/components/layout/NotFound';
import Techs from './components/tech/Techs';

//*STYLES
import '../src/assets/styles.css';
import 'materialize-css/dist/css/materialize.min.css';

//For render deployment,disables devtools in prod mode
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
if (process.env.NODE_ENV === 'production') disableReactDevTools();

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
