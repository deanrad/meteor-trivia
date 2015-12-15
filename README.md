# kickstart-hugeapp by thereactivestack

Kickstart a huge project fast with code splitting!

If you would like a simpler kickstart, see the [kickstart-simple project](https://github.com/thereactivestack/kickstart-simple).

Clone this project to start a simple project using Meteor, React.js and Webpack.

1. `git clone https://github.com/thereactivestack/kickstart-hugeapp.git`
1. `cd kickstart-hugeapp`
1. `meteor`

# Code splitting
When developing a huge application, you don't want to serve the entire JavaScript to the client. You might want to wait before he actually need it. This is the problem code splitting is fixing.

Let's say you have a todo application and an admin panel. Do you really want to serve the admin panel to your regular users? With code splitting, you don't need to. Look at [`modules/AdminApp/client/index.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/modules/AdminApp/client/index.js) code to see how it is working. You can copy / paste the same code to create new sections or sub-sections.

The code that is common to multiple sections will be bundled into `common.web.js` and automatically loaded by react-router-ssr.

# The stack & features
- Code splitting between parts of your application (dynamiclly loaded only once needed)
- Include the simple todo app example
- ES6 modules
- Meteor
- React.js
- react-router with server-rendering (you can disable it by editing `server/entry.js`)
- Webpack (bundle your app / assets and send them to Meteor)
- Hot-reload with no page refresh in development mode
- Optimize your code in production mode
- Give access to NPM by using packages.json

# How does it work?
Webpack needs one [`webpack.conf.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/client/webpack.conf.js) file for the client and one [`webpack.conf.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/server/webpack.conf.js) for the server. It allows you to have a better control over the build process. Every other files are not automatically included by Meteor. Everything is starting from your entry point. You can also have a [`webpack.conf.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/webpack.conf.js) that is shared between client and server for common settings.

The server entry point in the project is at [`entry/server/entry.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/server/entry.js). Everything that you want to load on your Meteor server, they have to be imported or required in some way.

The client entry point in the project is at [`entry/client/entry.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/server/entry.js) and work the same way as on the server, except it is run on the browser or Cordova.

You can use any package coming from NPM by adding it to [`packages.json`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/packages.json).

Go look at them, they are simple!

# Testing
If you would like to activate unit and integration tests, you can add the following packages:		

```sh		
meteor add sanjo:jasmine		
meteor add velocity:html-reporter		
```		

And uncomment the code in [entry/client/entry.js](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/client/entry.js#L15-L25) and [entry/server/entry.js](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/server/entry.js#L17-L24)

# Production
You can use meteor run, meteor build, mup or anything working with Meteor.

## Run in production mode
`meteor run --production`

## Build for production
`meteor build .`

## Deploy with Meteor-up
`mup deploy`

# Cordova
You need to do those 3 steps to make it works with iOS or Android:

1. Add the platform to your Meteor project

    ```javascript
    meteor add-platform ios
    meteor add-platform android
    ```
1. Allow access to your dev server in your `/mobile-config.js` file:

    ```javascript
    App.accessRule('http://192.168.1.100:3500/*');
    ```

1. Replace localhost by your local ip address in `/entry/webpack.conf.js`.
