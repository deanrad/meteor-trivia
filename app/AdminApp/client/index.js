// Replace 'admin' by your chunk name

// This ensure the admin is not bundled with the app on the client
// The script will be loaded only when needed
export default {
  path: 'admin',
  indexRoute: {
    onEnter: function (nextState, replaceState) {
      // Redirect to dashboard by default
      replaceState(null, '/admin/dashboard');
    }
  },
  getChildRoutes(location, cb) {
    if (Meteor.isClient) {
      // Split the code on a different file when on a client
      require.ensure([], require => {
        cb(null, require('./routes'))
      }, 'admin');
    } else {
      // Save the chunk for server-rendering
      global.__CHUNK_COLLECTOR__.push('admin')
      cb(null, require('./routes'));
    }
  }
};
