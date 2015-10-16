ReactRouterSSR.Run({
  childRoutes: [
    require('TodoApp/client'),
    require('AdminApp/client')
  ]
});
