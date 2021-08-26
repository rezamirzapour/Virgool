import { configureStore, Middleware } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";
import logger from 'redux-logger';
import saga from './saga';
import { auth, entities } from './reducer';

const sagaMiddleware = createSagaMiddleware()
const middleware: Middleware[] = [sagaMiddleware]

if (process.env.NODE_ENV === "development")
    middleware.push(logger)

export default configureStore({
    reducer: { auth, entities },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), ...middleware],
    devTools: true,
})

sagaMiddleware.run(saga)