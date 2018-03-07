import { createStore } from 'redux';
import rootReducer from '../reducers-combiner/index';

const store = createStore(rootReducer);

export default store;
