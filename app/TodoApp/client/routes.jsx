import TodoApp from './TodoApp';
import TodoMain from './TodoMain';

export default {
  path: '/',
  component: TodoApp,
  indexRoute: { component: TodoMain },
  childRoutes: []
};
