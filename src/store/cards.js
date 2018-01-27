import * as actions from '../actions/card_actions';
import cards from '../constants/cards.json';

const initialState = {...cards,
  selected_card: false
}

export default function cardsReducer(state = initialState, action) {
  switch(action.type) {
    case actions.SET_SELECTED_CARD:
      return {...state,
        selected_card: action.card
      }
    case actions.SET_LIST:
      return {...state,
        custom_list: action.list
      }
  }
  return state;
}