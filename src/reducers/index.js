import { combineReducers } from 'redux'

const game = (state = null, { type, payload }) => {
  switch (type) {
    case 'NEW_GAME':
      return payload;

    default:
      return state;
  }
}

export default combineReducers({
  game
});