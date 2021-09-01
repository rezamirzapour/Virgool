import { configureStore, Middleware } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";
import logger from 'redux-logger';
import saga from './saga';
import { auth, entities } from './reducer';
import { articlesApi, categoriesApi, rolesApi, permissionsApi } from './services'

const sagaMiddleware = createSagaMiddleware()
const middleware: Middleware[] = [
    sagaMiddleware,
    categoriesApi.middleware,
    articlesApi.middleware,
    rolesApi.middleware,
    permissionsApi.middleware,
]

if (process.env.NODE_ENV === "development")
    middleware.push(logger)

export const store = configureStore({
    reducer: {
        auth,
        entities,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [articlesApi.reducerPath]: articlesApi.reducer,
        [rolesApi.reducerPath]: rolesApi.reducer,
        [permissionsApi.reducerPath]: permissionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: true }), ...middleware],
    devTools: true,
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(saga)
export default store