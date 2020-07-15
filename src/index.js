import React, { useCallback } from "react";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  setVisibilityFilter,
  addTodo,
  toggleTodo,
  VisibilityFilters,
} from "./actions";

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter((t) => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter((t) => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const useTodos = () => {

  const dispatch = useDispatch();

  return {
    VISIBILITY_FILTERS: VisibilityFilters,
    actions: {
      toggleTodo: (id) => {
        dispatch(toggleTodo(id));
      },
      addTodo: (value) => {
        dispatch(addTodo(value));
      },
      setVisibility: useCallback(
        (filter) => {
          return () => {
            dispatch(setVisibilityFilter(filter));
          };
        },
        [dispatch]
      ),
    },
    selectors: {
      todos: useSelector((state) => {
        return getVisibleTodos(state.todos, state.visibilityFilter);
      }),
      active: useSelector((state) => {
        return (filter) => {
          return filter === state.visibilityFilter;
        };
      }),
    },
  };
};

export const TodosProvider = ({ children }) => {
  const store = createStore(rootReducer);
  return <Provider store={store}>{children}</Provider>;
};

export default useTodos;
