import { Route } from 'react-router';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import todoRoutes from 'TodoApp/client/routes';

const TriviaApp = () => (
    <h1>Trivia !</h1>
)

ReactRouterSSR.Run(
  <Route>
    <Route path="/" component={TriviaApp} />
  </Route>
);