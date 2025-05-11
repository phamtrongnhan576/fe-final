import { configureStore } from '@reduxjs/toolkit'
import searchSlice from "./slices/searchSlice"
import positionSlice from './slices/positionSlice'
import userSlice from './slices/userSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchSlice,
      position: positionSlice,
      user: userSlice,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
