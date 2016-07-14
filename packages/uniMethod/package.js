Package.describe({
  name: 'deanius:uni-method',
  summary: 'Better method invocations',
  version: '1.0.0',
  git: 'https://github.com/deanius/meteor-uniMethod'
})

Npm.depends({
  'bluebird': '3.4.1'
})

Package.onUse(function(api) {
  // Meteor releases below this version are not supported
  api.versionsFrom('1.3')

  // Core packages and 3rd party packages
  api.use('ecmascript')
  api.use('mdg:validated-method')

  api.addFiles('index.js')
  // The files of this package{{> apiFiles }}
  // The variables that become global for users of your package
  api.export('UniMethod')
})
