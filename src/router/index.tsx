import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import routerNames from './routerNames';

// TODO: add demais rotas que a aplicação usará
const router = createBrowserRouter([
  {
    path: routerNames.HOME,
    element: <Home />,
  },
  {
    path: routerNames.LOGIN,
    element: <Login />,
  },
]);

export default router;
