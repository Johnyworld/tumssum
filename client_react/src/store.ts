import { configureStore } from '@reduxjs/toolkit'
import modeReducer from './stores/modeSlice'
import userReducer from './stores/userSlice'
import accountReducer from './stores/accountSlice'
import confirmReducer from './stores/confirmSlice'
import toastReducer from './stores/toastSlice'

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    user: userReducer,
    account: accountReducer,
    confirm: confirmReducer,
    toast: toastReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
