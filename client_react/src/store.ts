import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './stores/modeSlice';
import userReducer from './stores/userSlice';
import accountReducer from './stores/accountSlice';
import bankReducer from './stores/bankSlice';
import monthReducer from './stores/monthSlice';
import categoryReducer from './stores/categorySlice';
import budgetReducer from './stores/budgetSlice';
import confirmReducer from './stores/confirmSlice';
import calendarReducer from './stores/calendarSlice';
import toastReducer from './stores/toastSlice';

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    user: userReducer,
    account: accountReducer,
    bank: bankReducer,
    month: monthReducer,
    category: categoryReducer,
    budget: budgetReducer,
    confirm: confirmReducer,
    calendar: calendarReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
