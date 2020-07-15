function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var redux = require('redux');
var reactRedux = require('react-redux');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var todos = function todos(state, action) {
  if (state === void 0) {
    state = [];
  }

  switch (action.type) {
    case 'ADD_TODO':
      return [].concat(state, [{
        id: action.id,
        text: action.text,
        completed: false
      }]);

    case 'TOGGLE_TODO':
      return state.map(function (todo) {
        return todo.id === action.id ? _extends({}, todo, {
          completed: !todo.completed
        }) : todo;
      });

    default:
      return state;
  }
};

var nextTodoId = 0;
var addTodo = function addTodo(text) {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text: text
  };
};
var setVisibilityFilter = function setVisibilityFilter(filter) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
};
var toggleTodo = function toggleTodo(id) {
  return {
    type: 'TOGGLE_TODO',
    id: id
  };
};
var VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

var visibilityFilter = function visibilityFilter(state, action) {
  if (state === void 0) {
    state = VisibilityFilters.SHOW_ALL;
  }

  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;

    default:
      return state;
  }
};

var rootReducer = redux.combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

var store = redux.createStore(rootReducer);

var getVisibleTodos = function getVisibleTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;

    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(function (t) {
        return t.completed;
      });

    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(function (t) {
        return !t.completed;
      });

    default:
      throw new Error("Unknown filter: " + filter);
  }
};

var useTodos = function useTodos() {
  var dispatch = reactRedux.useDispatch();
  return {
    VISIBILITY_FILTERS: VisibilityFilters,
    actions: {
      toggleTodo: function toggleTodo$1(id) {
        dispatch(toggleTodo(id));
      },
      addTodo: function addTodo$1(value) {
        dispatch(addTodo(value));
      },
      setVisibility: React.useCallback(function (filter) {
        return function () {
          dispatch(setVisibilityFilter(filter));
        };
      }, [dispatch])
    },
    selectors: {
      todos: reactRedux.useSelector(function (state) {
        return getVisibleTodos(state.todos, state.visibilityFilter);
      }),
      active: reactRedux.useSelector(function (state) {
        return function (filter) {
          return filter === state.visibilityFilter;
        };
      })
    }
  };
};

var TodosProvider = function TodosProvider(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React__default.createElement(reactRedux.Provider, {
    store: store
  }, children);
};

exports.TodosProvider = TodosProvider;
exports.default = useTodos;
//# sourceMappingURL=index.js.map
