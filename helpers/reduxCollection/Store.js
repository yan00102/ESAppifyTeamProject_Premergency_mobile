/**
 *
 * Store.js
 * Jongsu An
 * Feb 28, 2021
 *
 * This is a store of redux
 *
 */

import rootReducer from "./Reducers";
import { createStore } from "redux";
const store = createStore(rootReducer);
export default store;
