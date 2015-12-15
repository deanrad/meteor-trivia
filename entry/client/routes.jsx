import TodoApp from 'TodoApp/client';
import AdminApp from 'AdminApp/client';

ReactRouterSSR.Run({
  childRoutes: [
    TodoApp,
    AdminApp
  ]
});
