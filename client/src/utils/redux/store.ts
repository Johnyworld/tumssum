import { configureStore } from '@reduxjs/toolkit'
import modeReducer from '~stores/modeSlice'
import userReducer from '~stores/userSlice'
import dateReducer from '~stores/dateSlice';
import accountReducer from '~stores/accountSlice';
import categoryReducer from '~stores/categorySlice';
import bankReducer from '~stores/bankSlice';
import monthReducer from '~stores/monthSlice';
import budgetReducer from '~stores/budgetSlice';
import toastReducer from '~stores/toastSlice';
import alertReducer from '~stores/alertSlice';
import confirmReducer from '~stores/confirmSlice';


export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: {
    mode: modeReducer,
    user: userReducer,
    date: dateReducer,
    account: accountReducer,
    category: categoryReducer,
    bank: bankReducer,
    month: monthReducer,
    budget: budgetReducer,
    toast: toastReducer,
    alert: alertReducer,
    confirm: confirmReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
