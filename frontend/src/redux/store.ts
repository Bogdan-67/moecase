'use client';
import { configureStore } from '@reduxjs/toolkit';
import { caseApi } from './services/case';
import { stockApi } from './services/stock';
import { groupApi } from './services/group';
import authSlice from './slices/authSlice';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authSlice,
      [caseApi.reducerPath]: caseApi.reducer,
      [stockApi.reducerPath]: stockApi.reducer,
      [groupApi.reducerPath]: groupApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(caseApi.middleware, stockApi.middleware, groupApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;

export const wrapper = createWrapper<AppStore>(makeStore);
