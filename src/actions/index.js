export const newGame = data => ({ type: 'NEW_GAME', payload: data });

export const updateScore = data => ({ type: 'UPDATE_SCORE', payload: data });
export const updateHighScore = data => ({ type: 'UPDATE_HIGH_SCORE', payload: data });

export const updatePage = data => ({ type: 'UPDATE_PAGE', payload: data })

export const updateTheme = data => ({ type: 'UPDATE_THEME', payload: data });