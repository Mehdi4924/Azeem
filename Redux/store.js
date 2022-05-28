import {createStore} from 'redux';
import AllReducer from './Reducer/AllReducer';

const store = createStore(AllReducer);

export default store;