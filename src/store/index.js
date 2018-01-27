import { combineReducers } from 'redux';
import navigation from './navigation';
import cards from './cards';

const reducer = combineReducers({
  navigation,
  cards
})

export default reducer