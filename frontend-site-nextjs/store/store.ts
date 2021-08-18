import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import authReducer from './auth';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

if (process.env.NODE_ENV === "development")
    middleware.push(logger)

export default configureStore({
    reducer: {
        auth: authReducer
    },
    middleware
})

sagaMiddleware.run(saga)