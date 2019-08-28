import { combineReducers } from 'redux'

const game = (state = { level: null, score: 0, highScore: 0 }, { type, payload }) => {
  switch (type) {
    case 'NEW_GAME':
      return { ...state, level: payload }

    case 'UPDATE_SCORE':
      return { ...state, score: payload }

    case 'UPDATE_HIGH_SCORE':
      return { ...state, highScore: payload }

    default:
      return state;
  }
}

const theme = (state = null, { type, payload }) => {
  switch (type) {
    case 'UPDATE_THEME':
      return payload;

    default:
      return state;
  }
}

const page = (state = null, { type, payload }) => {
  switch (type) {
    case 'UPDATE_PAGE':
      return payload;

    default:
      return state;
  }
}

export default combineReducers({ game, theme, page });