import { configureStore, Middleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { pageInfo } from "./reducer";

const middleware: Middleware[] = [];

if (process.env.NODE_ENV === "development") middleware.push(logger);

export const store = configureStore({
  reducer: {
    pageInfo,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: true }),
    ...middleware,
  ],
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
