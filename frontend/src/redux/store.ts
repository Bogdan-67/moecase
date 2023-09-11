import { configureStore } from '@reduxjs/toolkit';
import { caseApi } from './services/case';
import { stockApi } from './services/stock';

export const store = configureStore({
  reducer: {
    [caseApi.reducerPath]: caseApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(caseApi.middleware, stockApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
