import { createStore } from 'redux';
import rootReducer from './reducers';

const configureStore = () => {
  console.log("------");
  
  const store = createStore(
    rootReducer(),
  );
  return store;
};

export default configureStore;
