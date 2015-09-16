require("babel/register");

var React = require('react');

var TodoApp = require('./components/TodoApp.react');

console.log(React.renderToString(React.createElement(TodoApp)));