import { configureStore, Middleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import authReducer from './auth';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware()
const middleware: Middleware[] = [sagaMiddleware]

if (process.env.NODE_ENV === "development")
    middleware.push(logger)

export default configureStore({
    reducer: {
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), ...middleware]
})

sagaMiddleware.run(saga)