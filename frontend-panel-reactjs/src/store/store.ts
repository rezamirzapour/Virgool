import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";
import logger from 'redux-logger';
import saga from './saga';
import { auth, entities } from './reducer';

const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

if (process.env.NODE_ENV === "development")
    middleware.push(logger)

export default configureStore({
    reducer: { auth, entities },
    middleware,
    devTools: true,
})

sagaMiddleware.run(saga)