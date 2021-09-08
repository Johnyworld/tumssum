import { configureStore } from '@reduxjs/toolkit'
import modeReducer from '~stores/modeSlice'
import userReducer from '~stores/userSlice'
import dateReducer from '~stores/dateSlice';
import accountReducer from '~stores/accountSlice';
import categoryReducer from '~stores/categorySlice';
import bankReducer from '~stores/bankSlice';
import monthReducer from '~stores/monthSlice';

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    user: userReducer,
    date: dateReducer,
    account: accountReducer,
    category: categoryReducer,
    bank: bankReducer,
    month: monthReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
