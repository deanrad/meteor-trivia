import MainApp from './MainApp';
import TodoApp from 'TodoApp/client';
import AdminApp from 'AdminApp/client';

ReactRouterSSR.Run({
  component: MainApp,
  childRoutes: [
    TodoApp,
    AdminApp
  ]
});
