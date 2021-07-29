import { createDraftSafeSelector } from '@reduxjs/toolkit';

const getVisibilityFilter = (state, props) =>
  state.posts[props.columnId].visibilityFilter

const getTodos = (state, props) =>
  state.posts[props.columnId].posts

const makeGetVisibleTodos = () => {
  return createDraftSafeSelector(
    [ getVisibilityFilter, getTodos ],
    (visibilityFilter, todos) => {
      switch (visibilityFilter) {
        case 'SHOW_COMPLETED':
          return todos.filter(todo => todo.completed)
        case 'SHOW_ACTIVE':
          return todos.filter(todo => !todo.completed)
        default:
          return todos
      }
    }
  )
}

export default makeGetVisibleTodos