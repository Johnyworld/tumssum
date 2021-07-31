import { configureStore } from '@reduxjs/toolkit'
import modeReducer from '~features/mode/modeSlice'
import userReducer from '~features/user/userSlice'
import monthReducer from '~features/month/monthSlice';
import accountReducer from '~features/account/accountSlice';

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    user: userReducer,
    month: monthReducer,
    account: accountReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
