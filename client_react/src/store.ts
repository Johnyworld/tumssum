import { configureStore } from '@reduxjs/toolkit'
import modeReducer from './stores/modeSlice'
import userReducer from './stores/userSlice'

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
