import { configureStore } from '@reduxjs/toolkit'
import modeReducer from './stores/modeSlice'
import userReducer from './stores/userSlice'
import accountReducer from './stores/accountSlice'

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    user: userReducer,
    account: accountReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
