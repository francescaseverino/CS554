import {combineReducers} from '@reduxjs/toolkit';
import collectionReducer from './collectionReducer'

const rootReducer = combineReducers({
    collections: collectionReducer
});

export default rootReducer;