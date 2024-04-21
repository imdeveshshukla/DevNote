import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: boolean,
  name:string
}

const initialState: CounterState = {
  value: false,
  name:""
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAuthTrue: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    setAuthFalse: (state) => {
      state.value = false
    },
    setname: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuthTrue, setAuthFalse, setname } = counterSlice.actions

export default counterSlice.reducer