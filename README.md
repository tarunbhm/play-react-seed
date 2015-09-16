# play-react-seed
Play framework and reactjs starter project with server side rendering examples

## This app is using
- [Play framework](https://www.playframework.com/) version 2.4.2
- flux-todomvc from [flux examples](https://github.com/facebook/flux/tree/master/examples/flux-todomvc)
- [Browserify](http://browserify.org/) with [babel](http://babeljs.io/) to compile JSX and package whole app for production
- [js-engine](https://github.com/typesafehub/js-engine) sbt plugin for executing javascript in jvm


## Requirements
- nodejs and npm (make sure it is added to your path)
- JDK8
- activator or sbt


## Try it out
- cd in to project directory
- run ```npm install``` to install react, flux and other javascript dependencies
- run ```activator run```
- go to http://localhost:9000/ssr to see server side renderd todomvc app


## Develop upon it

Javascript sources are in app/assets/javascripts directory. Here **app.js** is main javascript for client side redering and **appServer.js** is main javascript for server side rendering. Both of them render react component specified in TodoApp.react.js.

We have devided our javascript bundle in two parts:
  - **lib.js** this bundle contains pre-compiled compressed javascript libraries like react, flux, superagent etc
  - **bundle.js** this bundle contain our application javascript code with source maps for debugging

During development run ```npm start``` in terminal. This will start a watchify script which keeps compiling javascript sources after changes into **bundle.js**. For more information look at http://browserify.org/ and https://www.npmjs.com/package/watchify

Javascript app is developed as any other node application. After running ```npm start``` make changed in javascript files and reload browser to see changes. When ready for production build run ```npm run build```. It will compile and compress javasciprt sources in to **bundle.js** that will be packaged with your play application.


## TODO
- Add sample rest endpoints and use superagent in react app
- Add react-router and add an example to sender all routes server side