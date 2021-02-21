/** @format */

import createDataContext from './CreateDataContext';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'set_player1_color':
      return { ...state, player1: action.payload };

    case 'set_player2_color':
      return { ...state, player2: action.payload };

    case 'get_player_colors':
      return state;

    default:
      return state;
  }
};

const setPlayer1Color = (dispatch) => {
  return async (red, green, blue, callback) => {
    dispatch({ type: 'set_player1_color', payload: { red, green, blue } });
    if (callback) {
      callback();
    }
  };
};

const setPlayer2Color = (dispatch) => {
  return async (red, green, blue, callback) => {
    dispatch({ type: 'set_player2_color', payload: { red, green, blue } });
    if (callback) {
      callback();
    }
  };
};

const getPlayerColors = (dispatch) => {
  return async () => {
    dispatch({ type: 'get_player_colors'});
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { setPlayer1Color, setPlayer2Color, getPlayerColors },
  []
);
