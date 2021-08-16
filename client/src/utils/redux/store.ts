import { configureStore } from '@reduxjs/toolkit'
import modeReducer from '~features/mode/modeSlice'
import userReducer from '~features/user/userSlice'
import monthReducer from '~features/month/monthSlice';
import accountReducer from '~features/account/accountSlice';
import categoryReducer from '~features/category/categorySlice';
import bankReducer from '~features/bank/bankSlice';
import bankMonthReducer from '~stores/bankMonthSlice';

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    user: userReducer,
    month: monthReducer,
    account: accountReducer,
    category: categoryReducer,
    bank: bankReducer,
    bankMonth: bankMonthReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
