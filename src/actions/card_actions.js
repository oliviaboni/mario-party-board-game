export const SET_SELECTED_CARD = 'SET_SELECTED_CARD';
export const SET_LIST = 'SET_LIST';

export const selectCard = (card) => {
  return {type: SET_SELECTED_CARD, card}
}

export const setList = (list) => {
  return {type: SET_LIST, list}
}