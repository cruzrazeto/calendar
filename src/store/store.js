import React from 'react';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { uiSlice, calendarSlice } from './';

export const store = configureStore({
    reducer:{
      ui: uiSlice.reducer,
      calendar: calendarSlice.reducer,
    },
    middleware: (getDefaultMiddleware ) => getDefaultMiddleware({
      serializableCheck:false
    })
  })