import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import Home from '../pages/Home';
import routerNames from './routerNames';

// TODO: add demais rotas que a aplicação usará
const router = createBrowserRouter([
  {
    path: routerNames.HOME,
    element: (
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    ),
  },
]);

export default router;
