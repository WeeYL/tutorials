import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    message: 'Initial message',
    index:0
  },
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    setIndex(state, action: PayloadAction<number>) {
      state.index = action.payload;
    }
  }
});

export const { setMessage, setIndex } = messageSlice.actions;
export default messageSlice.reducer;