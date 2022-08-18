import { combineReducers, createStore } from "redux";
import appReducer from "./app-reducer";

let reducers = combineReducers({
  app: appReducer,
});

const store = createStore(reducers);
export default store;

window.store = store;
