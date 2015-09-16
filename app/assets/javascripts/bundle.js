(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

  /**
   * @param  {string} text
   */
  create: function create(text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function updateText(id, text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function toggleComplete(todo) {
    var id = todo.id;
    var actionType = todo.complete ? TodoConstants.TODO_UNDO_COMPLETE : TodoConstants.TODO_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function toggleCompleteAll() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function destroy(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function destroyCompleted() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  }

};

module.exports = TodoActions;

},{"../constants/TodoConstants":9,"../dispatcher/AppDispatcher":10}],2:[function(require,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var React = require('react');

var TodoApp = require('./components/TodoApp.react');

React.render(React.createElement(TodoApp, null), document.getElementById('todoapp'));

},{"./components/TodoApp.react":6,"react":"react"}],3:[function(require,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');

var Footer = React.createClass({
  displayName: 'Footer',

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function render() {
    var allTodos = this.props.allTodos;
    var total = Object.keys(allTodos).length;

    if (total === 0) {
      return null;
    }

    var completed = 0;
    for (var key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton = React.createElement(
        'button',
        {
          id: 'clear-completed',
          onClick: this._onClearCompletedClick },
        'Clear completed (',
        completed,
        ')'
      );
    }

    return React.createElement(
      'footer',
      { id: 'footer' },
      React.createElement(
        'span',
        { id: 'todo-count' },
        React.createElement(
          'strong',
          null,
          itemsLeft
        ),
        itemsLeftPhrase
      ),
      clearCompletedButton
    );
  },

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick: function _onClearCompletedClick() {
    TodoActions.destroyCompleted();
  }

});

module.exports = Footer;

},{"../actions/TodoActions":1,"react":"react"}],4:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var Header = React.createClass({
  displayName: 'Header',

  /**
   * @return {object}
   */
  render: function render() {
    return React.createElement(
      'header',
      { id: 'header' },
      React.createElement(
        'h1',
        null,
        'todos'
      ),
      React.createElement(TodoTextInput, {
        id: 'new-todo',
        placeholder: 'What needs to be done?',
        onSave: this._onSave
      })
    );
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function _onSave(text) {
    if (text.trim()) {
      TodoActions.create(text);
    }
  }

});

module.exports = Header;

},{"../actions/TodoActions":1,"./TodoTextInput.react":8,"react":"react"}],5:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem.react');

var MainSection = React.createClass({
  displayName: 'MainSection',

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  /**
   * @return {object}
   */
  render: function render() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (Object.keys(this.props.allTodos).length < 1) {
      return null;
    }

    var allTodos = this.props.allTodos;
    var todos = [];

    for (var key in allTodos) {
      todos.push(React.createElement(TodoItem, { key: key, todo: allTodos[key] }));
    }

    return React.createElement(
      'section',
      { id: 'main' },
      React.createElement('input', {
        id: 'toggle-all',
        type: 'checkbox',
        onChange: this._onToggleCompleteAll,
        checked: this.props.areAllComplete ? 'checked' : ''
      }),
      React.createElement(
        'label',
        { htmlFor: 'toggle-all' },
        'Mark all as complete'
      ),
      React.createElement(
        'ul',
        { id: 'todo-list' },
        todos
      )
    );
  },

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll: function _onToggleCompleteAll() {
    TodoActions.toggleCompleteAll();
  }

});

module.exports = MainSection;

},{"../actions/TodoActions":1,"./TodoItem.react":7,"react":"react"}],6:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

'use strict';

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

var TodoApp = React.createClass({
  displayName: 'TodoApp',

  getInitialState: function getInitialState() {
    return getTodoState();
  },

  componentDidMount: function componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(Header, null),
      React.createElement(MainSection, {
        allTodos: this.state.allTodos,
        areAllComplete: this.state.areAllComplete
      }),
      React.createElement(Footer, { allTodos: this.state.allTodos })
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function _onChange() {
    this.setState(getTodoState());
  }

});

module.exports = TodoApp;

},{"../stores/TodoStore":11,"./Footer.react":3,"./Header.react":4,"./MainSection.react":5,"react":"react"}],7:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var classNames = require('classnames');

var TodoItem = React.createClass({
  displayName: 'TodoItem',

  propTypes: {
    todo: ReactPropTypes.object.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function render() {
    var todo = this.props.todo;

    var input;
    if (this.state.isEditing) {
      input = React.createElement(TodoTextInput, {
        className: 'edit',
        onSave: this._onSave,
        value: todo.text
      });
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return React.createElement(
      'li',
      {
        className: classNames({
          'completed': todo.complete,
          'editing': this.state.isEditing
        }),
        key: todo.id },
      React.createElement(
        'div',
        { className: 'view' },
        React.createElement('input', {
          className: 'toggle',
          type: 'checkbox',
          checked: todo.complete,
          onChange: this._onToggleComplete
        }),
        React.createElement(
          'label',
          { onDoubleClick: this._onDoubleClick },
          todo.text
        ),
        React.createElement('button', { className: 'destroy', onClick: this._onDestroyClick })
      ),
      input
    );
  },

  _onToggleComplete: function _onToggleComplete() {
    TodoActions.toggleComplete(this.props.todo);
  },

  _onDoubleClick: function _onDoubleClick() {
    this.setState({ isEditing: true });
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function _onSave(text) {
    TodoActions.updateText(this.props.todo.id, text);
    this.setState({ isEditing: false });
  },

  _onDestroyClick: function _onDestroyClick() {
    TodoActions.destroy(this.props.todo.id);
  }

});

module.exports = TodoItem;

},{"../actions/TodoActions":1,"./TodoTextInput.react":8,"classnames":"classnames","react":"react"}],8:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var TodoTextInput = React.createClass({
  displayName: 'TodoTextInput',

  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.value || ''
    };
  },

  /**
   * @return {object}
   */
  render: function render() /*object*/{
    return React.createElement('input', {
      className: this.props.className,
      id: this.props.id,
      placeholder: this.props.placeholder,
      onBlur: this._save,
      onChange: this._onChange,
      onKeyDown: this._onKeyDown,
      value: this.state.value,
      autoFocus: true
    });
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function _save() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },

  /**
   * @param {object} event
   */
  _onChange: function _onChange( /*object*/event) {
    this.setState({
      value: event.target.value
    });
  },

  /**
   * @param  {object} event
   */
  _onKeyDown: function _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

});

module.exports = TodoTextInput;

},{"react":"react"}],9:[function(require,module,exports){
/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoConstants
 */

'use strict';

var keyMirror = require('keymirror');

module.exports = keyMirror({
  TODO_CREATE: null,
  TODO_COMPLETE: null,
  TODO_DESTROY: null,
  TODO_DESTROY_COMPLETED: null,
  TODO_TOGGLE_COMPLETE_ALL: null,
  TODO_UNDO_COMPLETE: null,
  TODO_UPDATE_TEXT: null
});

},{"keymirror":"keymirror"}],10:[function(require,module,exports){
/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */

'use strict';

var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();

},{"flux":"flux"}],11:[function(require,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function areAllComplete() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function getAll() {
    return _todos;
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function (action) {
  var text;

  switch (action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({ complete: false });
      } else {
        updateAll({ complete: true });
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, { complete: false });
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, { complete: true });
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, { text: text });
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;

    default:
    // no op
  }
});

module.exports = TodoStore;

},{"../constants/TodoConstants":9,"../dispatcher/AppDispatcher":10,"events":12,"object-assign":"object-assign"}],12:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS90YXJ1bi9kZXZlbG9wL2V4cGVyaW1lbnRzL3NjYWxhL3BsYXktcmVhY3Qtc2VlZC9hcHAvYXNzZXRzL2phdmFzY3JpcHRzL2FjdGlvbnMvVG9kb0FjdGlvbnMuanMiLCIvaG9tZS90YXJ1bi9kZXZlbG9wL2V4cGVyaW1lbnRzL3NjYWxhL3BsYXktcmVhY3Qtc2VlZC9hcHAvYXNzZXRzL2phdmFzY3JpcHRzL2FwcC5qcyIsIi9ob21lL3RhcnVuL2RldmVsb3AvZXhwZXJpbWVudHMvc2NhbGEvcGxheS1yZWFjdC1zZWVkL2FwcC9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9Gb290ZXIucmVhY3QuanMiLCIvaG9tZS90YXJ1bi9kZXZlbG9wL2V4cGVyaW1lbnRzL3NjYWxhL3BsYXktcmVhY3Qtc2VlZC9hcHAvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvSGVhZGVyLnJlYWN0LmpzIiwiL2hvbWUvdGFydW4vZGV2ZWxvcC9leHBlcmltZW50cy9zY2FsYS9wbGF5LXJlYWN0LXNlZWQvYXBwL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01haW5TZWN0aW9uLnJlYWN0LmpzIiwiL2hvbWUvdGFydW4vZGV2ZWxvcC9leHBlcmltZW50cy9zY2FsYS9wbGF5LXJlYWN0LXNlZWQvYXBwL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL1RvZG9BcHAucmVhY3QuanMiLCIvaG9tZS90YXJ1bi9kZXZlbG9wL2V4cGVyaW1lbnRzL3NjYWxhL3BsYXktcmVhY3Qtc2VlZC9hcHAvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvVG9kb0l0ZW0ucmVhY3QuanMiLCIvaG9tZS90YXJ1bi9kZXZlbG9wL2V4cGVyaW1lbnRzL3NjYWxhL3BsYXktcmVhY3Qtc2VlZC9hcHAvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvVG9kb1RleHRJbnB1dC5yZWFjdC5qcyIsIi9ob21lL3RhcnVuL2RldmVsb3AvZXhwZXJpbWVudHMvc2NhbGEvcGxheS1yZWFjdC1zZWVkL2FwcC9hc3NldHMvamF2YXNjcmlwdHMvY29uc3RhbnRzL1RvZG9Db25zdGFudHMuanMiLCIvaG9tZS90YXJ1bi9kZXZlbG9wL2V4cGVyaW1lbnRzL3NjYWxhL3BsYXktcmVhY3Qtc2VlZC9hcHAvYXNzZXRzL2phdmFzY3JpcHRzL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlci5qcyIsIi9ob21lL3RhcnVuL2RldmVsb3AvZXhwZXJpbWVudHMvc2NhbGEvcGxheS1yZWFjdC1zZWVkL2FwcC9hc3NldHMvamF2YXNjcmlwdHMvc3RvcmVzL1RvZG9TdG9yZS5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztBQ1dBLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQzNELElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOztBQUUxRCxJQUFJLFdBQVcsR0FBRzs7Ozs7QUFLaEIsUUFBTSxFQUFFLGdCQUFTLElBQUksRUFBRTtBQUNyQixpQkFBYSxDQUFDLFFBQVEsQ0FBQztBQUNyQixnQkFBVSxFQUFFLGFBQWEsQ0FBQyxXQUFXO0FBQ3JDLFVBQUksRUFBRSxJQUFJO0tBQ1gsQ0FBQyxDQUFDO0dBQ0o7Ozs7OztBQU1ELFlBQVUsRUFBRSxvQkFBUyxFQUFFLEVBQUUsSUFBSSxFQUFFO0FBQzdCLGlCQUFhLENBQUMsUUFBUSxDQUFDO0FBQ3JCLGdCQUFVLEVBQUUsYUFBYSxDQUFDLGdCQUFnQjtBQUMxQyxRQUFFLEVBQUUsRUFBRTtBQUNOLFVBQUksRUFBRSxJQUFJO0tBQ1gsQ0FBQyxDQUFDO0dBQ0o7Ozs7OztBQU1ELGdCQUFjLEVBQUUsd0JBQVMsSUFBSSxFQUFFO0FBQzdC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U0FBSyxhQUFhLENBQUMsc0JBQXNCO0FBQ3ZDLHNCQUFnQixFQUFFLENBQUM7QUFDbkIsZUFBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3ZCLFlBQU07O0FBQUEsQUFFUixZQUFROztHQUVUO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDOzs7QUM3SzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogVG9kb0FjdGlvbnNcbiAqL1xuXG52YXIgQXBwRGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcicpO1xudmFyIFRvZG9Db25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMvVG9kb0NvbnN0YW50cycpO1xuXG52YXIgVG9kb0FjdGlvbnMgPSB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgY3JlYXRlOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgQXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgICBhY3Rpb25UeXBlOiBUb2RvQ29uc3RhbnRzLlRPRE9fQ1JFQVRFLFxuICAgICAgdGV4dDogdGV4dFxuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGlkIFRoZSBJRCBvZiB0aGUgVG9EbyBpdGVtXG4gICAqIEBwYXJhbSAge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgdXBkYXRlVGV4dDogZnVuY3Rpb24oaWQsIHRleHQpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAgICAgIGFjdGlvblR5cGU6IFRvZG9Db25zdGFudHMuVE9ET19VUERBVEVfVEVYVCxcbiAgICAgIGlkOiBpZCxcbiAgICAgIHRleHQ6IHRleHRcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogVG9nZ2xlIHdoZXRoZXIgYSBzaW5nbGUgVG9EbyBpcyBjb21wbGV0ZVxuICAgKiBAcGFyYW0gIHtvYmplY3R9IHRvZG9cbiAgICovXG4gIHRvZ2dsZUNvbXBsZXRlOiBmdW5jdGlvbih0b2RvKSB7XG4gICAgdmFyIGlkID0gdG9kby5pZDtcbiAgICB2YXIgYWN0aW9uVHlwZSA9IHRvZG8uY29tcGxldGUgP1xuICAgICAgICBUb2RvQ29uc3RhbnRzLlRPRE9fVU5ET19DT01QTEVURSA6XG4gICAgICAgIFRvZG9Db25zdGFudHMuVE9ET19DT01QTEVURTtcblxuICAgIEFwcERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgICAgYWN0aW9uVHlwZTogYWN0aW9uVHlwZSxcbiAgICAgIGlkOiBpZFxuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNYXJrIGFsbCBUb0RvcyBhcyBjb21wbGV0ZVxuICAgKi9cbiAgdG9nZ2xlQ29tcGxldGVBbGw6IGZ1bmN0aW9uKCkge1xuICAgIEFwcERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgICAgYWN0aW9uVHlwZTogVG9kb0NvbnN0YW50cy5UT0RPX1RPR0dMRV9DT01QTEVURV9BTExcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtICB7c3RyaW5nfSBpZFxuICAgKi9cbiAgZGVzdHJveTogZnVuY3Rpb24oaWQpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAgICAgIGFjdGlvblR5cGU6IFRvZG9Db25zdGFudHMuVE9ET19ERVNUUk9ZLFxuICAgICAgaWQ6IGlkXG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbGwgdGhlIGNvbXBsZXRlZCBUb0Rvc1xuICAgKi9cbiAgZGVzdHJveUNvbXBsZXRlZDogZnVuY3Rpb24oKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgICBhY3Rpb25UeXBlOiBUb2RvQ29uc3RhbnRzLlRPRE9fREVTVFJPWV9DT01QTEVURURcbiAgICB9KTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRvZG9BY3Rpb25zO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgVG9kb0FwcCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Ub2RvQXBwLnJlYWN0Jyk7XG5cblJlYWN0LnJlbmRlcihcbiAgPFRvZG9BcHAgLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvYXBwJylcbik7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RQcm9wVHlwZXMgPSBSZWFjdC5Qcm9wVHlwZXM7XG52YXIgVG9kb0FjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL1RvZG9BY3Rpb25zJyk7XG5cbnZhciBGb290ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgYWxsVG9kb3M6IFJlYWN0UHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICovXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFsbFRvZG9zID0gdGhpcy5wcm9wcy5hbGxUb2RvcztcbiAgICB2YXIgdG90YWwgPSBPYmplY3Qua2V5cyhhbGxUb2RvcykubGVuZ3RoO1xuXG4gICAgaWYgKHRvdGFsID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICBmb3IgKHZhciBrZXkgaW4gYWxsVG9kb3MpIHtcbiAgICAgIGlmIChhbGxUb2Rvc1trZXldLmNvbXBsZXRlKSB7XG4gICAgICAgIGNvbXBsZXRlZCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBpdGVtc0xlZnQgPSB0b3RhbCAtIGNvbXBsZXRlZDtcbiAgICB2YXIgaXRlbXNMZWZ0UGhyYXNlID0gaXRlbXNMZWZ0ID09PSAxID8gJyBpdGVtICcgOiAnIGl0ZW1zICc7XG4gICAgaXRlbXNMZWZ0UGhyYXNlICs9ICdsZWZ0JztcblxuICAgIC8vIFVuZGVmaW5lZCBhbmQgdGh1cyBub3QgcmVuZGVyZWQgaWYgbm8gY29tcGxldGVkIGl0ZW1zIGFyZSBsZWZ0LlxuICAgIHZhciBjbGVhckNvbXBsZXRlZEJ1dHRvbjtcbiAgICBpZiAoY29tcGxldGVkKSB7XG4gICAgICBjbGVhckNvbXBsZXRlZEJ1dHRvbiA9XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBpZD1cImNsZWFyLWNvbXBsZXRlZFwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5fb25DbGVhckNvbXBsZXRlZENsaWNrfT5cbiAgICAgICAgICBDbGVhciBjb21wbGV0ZWQgKHtjb21wbGV0ZWR9KVxuICAgICAgICA8L2J1dHRvbj47XG4gICAgfVxuXG4gIFx0cmV0dXJuIChcbiAgICAgIDxmb290ZXIgaWQ9XCJmb290ZXJcIj5cbiAgICAgICAgPHNwYW4gaWQ9XCJ0b2RvLWNvdW50XCI+XG4gICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgIHtpdGVtc0xlZnR9XG4gICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAge2l0ZW1zTGVmdFBocmFzZX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICB7Y2xlYXJDb21wbGV0ZWRCdXR0b259XG4gICAgICA8L2Zvb3Rlcj5cbiAgICApO1xuICB9LFxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIHRvIGRlbGV0ZSBhbGwgY29tcGxldGVkIFRPRE9zXG4gICAqL1xuICBfb25DbGVhckNvbXBsZXRlZENsaWNrOiBmdW5jdGlvbigpIHtcbiAgICBUb2RvQWN0aW9ucy5kZXN0cm95Q29tcGxldGVkKCk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgVG9kb0FjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL1RvZG9BY3Rpb25zJyk7XG52YXIgVG9kb1RleHRJbnB1dCA9IHJlcXVpcmUoJy4vVG9kb1RleHRJbnB1dC5yZWFjdCcpO1xuXG52YXIgSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqL1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aGVhZGVyIGlkPVwiaGVhZGVyXCI+XG4gICAgICAgIDxoMT50b2RvczwvaDE+XG4gICAgICAgIDxUb2RvVGV4dElucHV0XG4gICAgICAgICAgaWQ9XCJuZXctdG9kb1wiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJXaGF0IG5lZWRzIHRvIGJlIGRvbmU/XCJcbiAgICAgICAgICBvblNhdmU9e3RoaXMuX29uU2F2ZX1cbiAgICAgICAgLz5cbiAgICAgIDwvaGVhZGVyPlxuICAgICk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgY2FsbGVkIHdpdGhpbiBUb2RvVGV4dElucHV0LlxuICAgKiBEZWZpbmluZyB0aGlzIGhlcmUgYWxsb3dzIFRvZG9UZXh0SW5wdXQgdG8gYmUgdXNlZCBpbiBtdWx0aXBsZSBwbGFjZXNcbiAgICogaW4gZGlmZmVyZW50IHdheXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBfb25TYXZlOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgaWYgKHRleHQudHJpbSgpKXtcbiAgICAgIFRvZG9BY3Rpb25zLmNyZWF0ZSh0ZXh0KTtcbiAgICB9XG5cbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdFByb3BUeXBlcyA9IFJlYWN0LlByb3BUeXBlcztcbnZhciBUb2RvQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvVG9kb0FjdGlvbnMnKTtcbnZhciBUb2RvSXRlbSA9IHJlcXVpcmUoJy4vVG9kb0l0ZW0ucmVhY3QnKTtcblxudmFyIE1haW5TZWN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHByb3BUeXBlczoge1xuICAgIGFsbFRvZG9zOiBSZWFjdFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBhcmVBbGxDb21wbGV0ZTogUmVhY3RQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICovXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgLy8gVGhpcyBzZWN0aW9uIHNob3VsZCBiZSBoaWRkZW4gYnkgZGVmYXVsdFxuICAgIC8vIGFuZCBzaG93biB3aGVuIHRoZXJlIGFyZSB0b2Rvcy5cbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5wcm9wcy5hbGxUb2RvcykubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGFsbFRvZG9zID0gdGhpcy5wcm9wcy5hbGxUb2RvcztcbiAgICB2YXIgdG9kb3MgPSBbXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBhbGxUb2Rvcykge1xuICAgICAgdG9kb3MucHVzaCg8VG9kb0l0ZW0ga2V5PXtrZXl9IHRvZG89e2FsbFRvZG9zW2tleV19IC8+KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNlY3Rpb24gaWQ9XCJtYWluXCI+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGlkPVwidG9nZ2xlLWFsbFwiXG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fb25Ub2dnbGVDb21wbGV0ZUFsbH1cbiAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLmFyZUFsbENvbXBsZXRlID8gJ2NoZWNrZWQnIDogJyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwidG9nZ2xlLWFsbFwiPk1hcmsgYWxsIGFzIGNvbXBsZXRlPC9sYWJlbD5cbiAgICAgICAgPHVsIGlkPVwidG9kby1saXN0XCI+e3RvZG9zfTwvdWw+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgKTtcbiAgfSxcblxuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciB0byBtYXJrIGFsbCBUT0RPcyBhcyBjb21wbGV0ZVxuICAgKi9cbiAgX29uVG9nZ2xlQ29tcGxldGVBbGw6IGZ1bmN0aW9uKCkge1xuICAgIFRvZG9BY3Rpb25zLnRvZ2dsZUNvbXBsZXRlQWxsKCk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFpblNlY3Rpb247XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCBvcGVyYXRlcyBhcyBhIFwiQ29udHJvbGxlci1WaWV3XCIuICBJdCBsaXN0ZW5zIGZvciBjaGFuZ2VzIGluXG4gKiB0aGUgVG9kb1N0b3JlIGFuZCBwYXNzZXMgdGhlIG5ldyBkYXRhIHRvIGl0cyBjaGlsZHJlbi5cbiAqL1xuXG52YXIgRm9vdGVyID0gcmVxdWlyZSgnLi9Gb290ZXIucmVhY3QnKTtcbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL0hlYWRlci5yZWFjdCcpO1xudmFyIE1haW5TZWN0aW9uID0gcmVxdWlyZSgnLi9NYWluU2VjdGlvbi5yZWFjdCcpO1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBUb2RvU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvVG9kb1N0b3JlJyk7XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGN1cnJlbnQgVE9ETyBkYXRhIGZyb20gdGhlIFRvZG9TdG9yZVxuICovXG5mdW5jdGlvbiBnZXRUb2RvU3RhdGUoKSB7XG4gIHJldHVybiB7XG4gICAgYWxsVG9kb3M6IFRvZG9TdG9yZS5nZXRBbGwoKSxcbiAgICBhcmVBbGxDb21wbGV0ZTogVG9kb1N0b3JlLmFyZUFsbENvbXBsZXRlKClcbiAgfTtcbn1cblxudmFyIFRvZG9BcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZ2V0VG9kb1N0YXRlKCk7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFRvZG9TdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLl9vbkNoYW5nZSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFRvZG9TdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLl9vbkNoYW5nZSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICovXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxIZWFkZXIgLz5cbiAgICAgICAgPE1haW5TZWN0aW9uXG4gICAgICAgICAgYWxsVG9kb3M9e3RoaXMuc3RhdGUuYWxsVG9kb3N9XG4gICAgICAgICAgYXJlQWxsQ29tcGxldGU9e3RoaXMuc3RhdGUuYXJlQWxsQ29tcGxldGV9XG4gICAgICAgIC8+XG4gICAgICAgIDxGb290ZXIgYWxsVG9kb3M9e3RoaXMuc3RhdGUuYWxsVG9kb3N9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciAnY2hhbmdlJyBldmVudHMgY29taW5nIGZyb20gdGhlIFRvZG9TdG9yZVxuICAgKi9cbiAgX29uQ2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKGdldFRvZG9TdGF0ZSgpKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUb2RvQXBwO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RQcm9wVHlwZXMgPSBSZWFjdC5Qcm9wVHlwZXM7XG52YXIgVG9kb0FjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL1RvZG9BY3Rpb25zJyk7XG52YXIgVG9kb1RleHRJbnB1dCA9IHJlcXVpcmUoJy4vVG9kb1RleHRJbnB1dC5yZWFjdCcpO1xuXG52YXIgY2xhc3NOYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIFRvZG9JdGVtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHByb3BUeXBlczoge1xuICAgdG9kbzogUmVhY3RQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgfSxcblxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0VkaXRpbmc6IGZhbHNlXG4gICAgfTtcbiAgfSxcblxuICAvKipcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKi9cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdG9kbyA9IHRoaXMucHJvcHMudG9kbztcblxuICAgIHZhciBpbnB1dDtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc0VkaXRpbmcpIHtcbiAgICAgIGlucHV0ID1cbiAgICAgICAgPFRvZG9UZXh0SW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJlZGl0XCJcbiAgICAgICAgICBvblNhdmU9e3RoaXMuX29uU2F2ZX1cbiAgICAgICAgICB2YWx1ZT17dG9kby50ZXh0fVxuICAgICAgICAvPjtcbiAgICB9XG5cbiAgICAvLyBMaXN0IGl0ZW1zIHNob3VsZCBnZXQgdGhlIGNsYXNzICdlZGl0aW5nJyB3aGVuIGVkaXRpbmdcbiAgICAvLyBhbmQgJ2NvbXBsZXRlZCcgd2hlbiBtYXJrZWQgYXMgY29tcGxldGVkLlxuICAgIC8vIE5vdGUgdGhhdCAnY29tcGxldGVkJyBpcyBhIGNsYXNzaWZpY2F0aW9uIHdoaWxlICdjb21wbGV0ZScgaXMgYSBzdGF0ZS5cbiAgICAvLyBUaGlzIGRpZmZlcmVudGlhdGlvbiBiZXR3ZWVuIGNsYXNzaWZpY2F0aW9uIGFuZCBzdGF0ZSBiZWNvbWVzIGltcG9ydGFudFxuICAgIC8vIGluIHRoZSBuYW1pbmcgb2YgdmlldyBhY3Rpb25zIHRvZ2dsZUNvbXBsZXRlKCkgdnMuIGRlc3Ryb3lDb21wbGV0ZWQoKS5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgJ2NvbXBsZXRlZCc6IHRvZG8uY29tcGxldGUsXG4gICAgICAgICAgJ2VkaXRpbmcnOiB0aGlzLnN0YXRlLmlzRWRpdGluZ1xuICAgICAgICB9KX1cbiAgICAgICAga2V5PXt0b2RvLmlkfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aWV3XCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ0b2dnbGVcIlxuICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgIGNoZWNrZWQ9e3RvZG8uY29tcGxldGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fb25Ub2dnbGVDb21wbGV0ZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxsYWJlbCBvbkRvdWJsZUNsaWNrPXt0aGlzLl9vbkRvdWJsZUNsaWNrfT5cbiAgICAgICAgICAgIHt0b2RvLnRleHR9XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImRlc3Ryb3lcIiBvbkNsaWNrPXt0aGlzLl9vbkRlc3Ryb3lDbGlja30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtpbnB1dH1cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfSxcblxuICBfb25Ub2dnbGVDb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgVG9kb0FjdGlvbnMudG9nZ2xlQ29tcGxldGUodGhpcy5wcm9wcy50b2RvKTtcbiAgfSxcblxuICBfb25Eb3VibGVDbGljazogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7aXNFZGl0aW5nOiB0cnVlfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgY2FsbGVkIHdpdGhpbiBUb2RvVGV4dElucHV0LlxuICAgKiBEZWZpbmluZyB0aGlzIGhlcmUgYWxsb3dzIFRvZG9UZXh0SW5wdXQgdG8gYmUgdXNlZCBpbiBtdWx0aXBsZSBwbGFjZXNcbiAgICogaW4gZGlmZmVyZW50IHdheXMuXG4gICAqIEBwYXJhbSAge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgX29uU2F2ZTogZnVuY3Rpb24odGV4dCkge1xuICAgIFRvZG9BY3Rpb25zLnVwZGF0ZVRleHQodGhpcy5wcm9wcy50b2RvLmlkLCB0ZXh0KTtcbiAgICB0aGlzLnNldFN0YXRlKHtpc0VkaXRpbmc6IGZhbHNlfSk7XG4gIH0sXG5cbiAgX29uRGVzdHJveUNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICBUb2RvQWN0aW9ucy5kZXN0cm95KHRoaXMucHJvcHMudG9kby5pZCk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVG9kb0l0ZW07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdFByb3BUeXBlcyA9IFJlYWN0LlByb3BUeXBlcztcblxudmFyIEVOVEVSX0tFWV9DT0RFID0gMTM7XG5cbnZhciBUb2RvVGV4dElucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHByb3BUeXBlczoge1xuICAgIGNsYXNzTmFtZTogUmVhY3RQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlkOiBSZWFjdFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFJlYWN0UHJvcFR5cGVzLnN0cmluZyxcbiAgICBvblNhdmU6IFJlYWN0UHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUmVhY3RQcm9wVHlwZXMuc3RyaW5nXG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUgfHwgJydcbiAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqL1xuICByZW5kZXI6IGZ1bmN0aW9uKCkgLypvYmplY3QqLyB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICBpZD17dGhpcy5wcm9wcy5pZH1cbiAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9XG4gICAgICAgIG9uQmx1cj17dGhpcy5fc2F2ZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlfVxuICAgICAgICBvbktleURvd249e3RoaXMuX29uS2V5RG93bn1cbiAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgIGF1dG9Gb2N1cz17dHJ1ZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcblxuICAvKipcbiAgICogSW52b2tlcyB0aGUgY2FsbGJhY2sgcGFzc2VkIGluIGFzIG9uU2F2ZSwgYWxsb3dpbmcgdGhpcyBjb21wb25lbnQgdG8gYmVcbiAgICogdXNlZCBpbiBkaWZmZXJlbnQgd2F5cy5cbiAgICovXG4gIF9zYXZlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnByb3BzLm9uU2F2ZSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRcbiAgICovXG4gIF9vbkNoYW5nZTogZnVuY3Rpb24oLypvYmplY3QqLyBldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGV2ZW50XG4gICAqL1xuICBfb25LZXlEb3duOiBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFTlRFUl9LRVlfQ09ERSkge1xuICAgICAgdGhpcy5fc2F2ZSgpO1xuICAgIH1cbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUb2RvVGV4dElucHV0O1xuIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogVG9kb0NvbnN0YW50c1xuICovXG5cbnZhciBrZXlNaXJyb3IgPSByZXF1aXJlKCdrZXltaXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlNaXJyb3Ioe1xuICBUT0RPX0NSRUFURTogbnVsbCxcbiAgVE9ET19DT01QTEVURTogbnVsbCxcbiAgVE9ET19ERVNUUk9ZOiBudWxsLFxuICBUT0RPX0RFU1RST1lfQ09NUExFVEVEOiBudWxsLFxuICBUT0RPX1RPR0dMRV9DT01QTEVURV9BTEw6IG51bGwsXG4gIFRPRE9fVU5ET19DT01QTEVURTogbnVsbCxcbiAgVE9ET19VUERBVEVfVEVYVDogbnVsbFxufSk7XG4iLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBBcHBEaXNwYXRjaGVyXG4gKlxuICogQSBzaW5nbGV0b24gdGhhdCBvcGVyYXRlcyBhcyB0aGUgY2VudHJhbCBodWIgZm9yIGFwcGxpY2F0aW9uIHVwZGF0ZXMuXG4gKi9cblxudmFyIERpc3BhdGNoZXIgPSByZXF1aXJlKCdmbHV4JykuRGlzcGF0Y2hlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRGlzcGF0Y2hlcigpO1xuIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFRvZG9TdG9yZVxuICovXG5cbnZhciBBcHBEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIFRvZG9Db25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMvVG9kb0NvbnN0YW50cycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xuXG52YXIgX3RvZG9zID0ge307XG5cbi8qKlxuICogQ3JlYXRlIGEgVE9ETyBpdGVtLlxuICogQHBhcmFtICB7c3RyaW5nfSB0ZXh0IFRoZSBjb250ZW50IG9mIHRoZSBUT0RPXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZSh0ZXh0KSB7XG4gIC8vIEhhbmQgd2F2aW5nIGhlcmUgLS0gbm90IHNob3dpbmcgaG93IHRoaXMgaW50ZXJhY3RzIHdpdGggWEhSIG9yIHBlcnNpc3RlbnRcbiAgLy8gc2VydmVyLXNpZGUgc3RvcmFnZS5cbiAgLy8gVXNpbmcgdGhlIGN1cnJlbnQgdGltZXN0YW1wICsgcmFuZG9tIG51bWJlciBpbiBwbGFjZSBvZiBhIHJlYWwgaWQuXG4gIHZhciBpZCA9ICgrbmV3IERhdGUoKSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDk5OTk5OSkpLnRvU3RyaW5nKDM2KTtcbiAgX3RvZG9zW2lkXSA9IHtcbiAgICBpZDogaWQsXG4gICAgY29tcGxldGU6IGZhbHNlLFxuICAgIHRleHQ6IHRleHRcbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgYSBUT0RPIGl0ZW0uXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcGFyYW0ge29iamVjdH0gdXBkYXRlcyBBbiBvYmplY3QgbGl0ZXJhbCBjb250YWluaW5nIG9ubHkgdGhlIGRhdGEgdG8gYmVcbiAqICAgICB1cGRhdGVkLlxuICovXG5mdW5jdGlvbiB1cGRhdGUoaWQsIHVwZGF0ZXMpIHtcbiAgX3RvZG9zW2lkXSA9IGFzc2lnbih7fSwgX3RvZG9zW2lkXSwgdXBkYXRlcyk7XG59XG5cbi8qKlxuICogVXBkYXRlIGFsbCBvZiB0aGUgVE9ETyBpdGVtcyB3aXRoIHRoZSBzYW1lIG9iamVjdC5cbiAqIEBwYXJhbSAge29iamVjdH0gdXBkYXRlcyBBbiBvYmplY3QgbGl0ZXJhbCBjb250YWluaW5nIG9ubHkgdGhlIGRhdGEgdG8gYmVcbiAqICAgICB1cGRhdGVkLlxuICovXG5mdW5jdGlvbiB1cGRhdGVBbGwodXBkYXRlcykge1xuICBmb3IgKHZhciBpZCBpbiBfdG9kb3MpIHtcbiAgICB1cGRhdGUoaWQsIHVwZGF0ZXMpO1xuICB9XG59XG5cbi8qKlxuICogRGVsZXRlIGEgVE9ETyBpdGVtLlxuICogQHBhcmFtICB7c3RyaW5nfSBpZFxuICovXG5mdW5jdGlvbiBkZXN0cm95KGlkKSB7XG4gIGRlbGV0ZSBfdG9kb3NbaWRdO1xufVxuXG4vKipcbiAqIERlbGV0ZSBhbGwgdGhlIGNvbXBsZXRlZCBUT0RPIGl0ZW1zLlxuICovXG5mdW5jdGlvbiBkZXN0cm95Q29tcGxldGVkKCkge1xuICBmb3IgKHZhciBpZCBpbiBfdG9kb3MpIHtcbiAgICBpZiAoX3RvZG9zW2lkXS5jb21wbGV0ZSkge1xuICAgICAgZGVzdHJveShpZCk7XG4gICAgfVxuICB9XG59XG5cbnZhciBUb2RvU3RvcmUgPSBhc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcblxuICAvKipcbiAgICogVGVzdHMgd2hldGhlciBhbGwgdGhlIHJlbWFpbmluZyBUT0RPIGl0ZW1zIGFyZSBtYXJrZWQgYXMgY29tcGxldGVkLlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgYXJlQWxsQ29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGlkIGluIF90b2Rvcykge1xuICAgICAgaWYgKCFfdG9kb3NbaWRdLmNvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZW50aXJlIGNvbGxlY3Rpb24gb2YgVE9ET3MuXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICovXG4gIGdldEFsbDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIF90b2RvcztcbiAgfSxcblxuICBlbWl0Q2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmVtaXQoQ0hBTkdFX0VWRU5UKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHRoaXMub24oQ0hBTkdFX0VWRU5ULCBjYWxsYmFjayk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKENIQU5HRV9FVkVOVCwgY2FsbGJhY2spO1xuICB9XG59KTtcblxuLy8gUmVnaXN0ZXIgY2FsbGJhY2sgdG8gaGFuZGxlIGFsbCB1cGRhdGVzXG5BcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKGFjdGlvbikge1xuICB2YXIgdGV4dDtcblxuICBzd2l0Y2goYWN0aW9uLmFjdGlvblR5cGUpIHtcbiAgICBjYXNlIFRvZG9Db25zdGFudHMuVE9ET19DUkVBVEU6XG4gICAgICB0ZXh0ID0gYWN0aW9uLnRleHQudHJpbSgpO1xuICAgICAgaWYgKHRleHQgIT09ICcnKSB7XG4gICAgICAgIGNyZWF0ZSh0ZXh0KTtcbiAgICAgICAgVG9kb1N0b3JlLmVtaXRDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBUb2RvQ29uc3RhbnRzLlRPRE9fVE9HR0xFX0NPTVBMRVRFX0FMTDpcbiAgICAgIGlmIChUb2RvU3RvcmUuYXJlQWxsQ29tcGxldGUoKSkge1xuICAgICAgICB1cGRhdGVBbGwoe2NvbXBsZXRlOiBmYWxzZX0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBkYXRlQWxsKHtjb21wbGV0ZTogdHJ1ZX0pO1xuICAgICAgfVxuICAgICAgVG9kb1N0b3JlLmVtaXRDaGFuZ2UoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBUb2RvQ29uc3RhbnRzLlRPRE9fVU5ET19DT01QTEVURTpcbiAgICAgIHVwZGF0ZShhY3Rpb24uaWQsIHtjb21wbGV0ZTogZmFsc2V9KTtcbiAgICAgIFRvZG9TdG9yZS5lbWl0Q2hhbmdlKCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgVG9kb0NvbnN0YW50cy5UT0RPX0NPTVBMRVRFOlxuICAgICAgdXBkYXRlKGFjdGlvbi5pZCwge2NvbXBsZXRlOiB0cnVlfSk7XG4gICAgICBUb2RvU3RvcmUuZW1pdENoYW5nZSgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFRvZG9Db25zdGFudHMuVE9ET19VUERBVEVfVEVYVDpcbiAgICAgIHRleHQgPSBhY3Rpb24udGV4dC50cmltKCk7XG4gICAgICBpZiAodGV4dCAhPT0gJycpIHtcbiAgICAgICAgdXBkYXRlKGFjdGlvbi5pZCwge3RleHQ6IHRleHR9KTtcbiAgICAgICAgVG9kb1N0b3JlLmVtaXRDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBUb2RvQ29uc3RhbnRzLlRPRE9fREVTVFJPWTpcbiAgICAgIGRlc3Ryb3koYWN0aW9uLmlkKTtcbiAgICAgIFRvZG9TdG9yZS5lbWl0Q2hhbmdlKCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgVG9kb0NvbnN0YW50cy5UT0RPX0RFU1RST1lfQ09NUExFVEVEOlxuICAgICAgZGVzdHJveUNvbXBsZXRlZCgpO1xuICAgICAgVG9kb1N0b3JlLmVtaXRDaGFuZ2UoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIG5vIG9wXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRvZG9TdG9yZTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG5cbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICB2YXIgbTtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2Uge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIWVtaXR0ZXIuX2V2ZW50cyB8fCAhZW1pdHRlci5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IDA7XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24oZW1pdHRlci5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSAxO1xuICBlbHNlXG4gICAgcmV0ID0gZW1pdHRlci5fZXZlbnRzW3R5cGVdLmxlbmd0aDtcbiAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiJdfQ==
