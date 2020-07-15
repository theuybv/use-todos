import React, { useCallback } from 'react';
import { combineReducers, createStore } from 'redux';
import { useDispatch, useSelector, Provider } from 'react-redux';

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: action.id,
        text: action.text,
        completed: false
      }];

    case 'TOGGLE_TODO':
      return state.map(todo => todo.id === action.id ? { ...todo,
        completed: !todo.completed
      } : todo);

    default:
      return state;
  }
};

let nextTodoId = 0;
const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});
const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});
const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
});
const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;

    default:
      return state;
  }
};

var rootReducer = combineReducers({
  todos,
  visibilityFilter
});

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;

    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);

    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);

    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const useTodos = () => {
  const dispatch = useDispatch();
  return {
    VISIBILITY_FILTERS: VisibilityFilters,
    actions: {
      toggleTodo: id => {
        dispatch(toggleTodo(id));
      },
      addTodo: value => {
        dispatch(addTodo(value));
      },
      setVisibility: useCallback(filter => {
        return () => {
          dispatch(setVisibilityFilter(filter));
        };
      }, [dispatch])
    },
    selectors: {
      todos: useSelector(state => {
        return getVisibleTodos(state.todos, state.visibilityFilter);
      }),
      active: useSelector(state => {
        return filter => {
          return filter === state.visibilityFilter;
        };
      })
    }
  };
};

const TodosProvider = ({
  children
}) => {
  const store = createStore(rootReducer);
  return /*#__PURE__*/React.createElement(Provider, {
    store: store
  }, children);
};

export default useTodos;
export { TodosProvider };
//# sourceMappingURL=index.modern.js.map
