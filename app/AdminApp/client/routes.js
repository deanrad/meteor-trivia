import AdminApp from './AdminApp';
import Dashboard from './Dashboard';

export default {
  component: AdminApp,
  childRoutes: [
    { path: 'dashboard', component: Dashboard }
  ]
};
