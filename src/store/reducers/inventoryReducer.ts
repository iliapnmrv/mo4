import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InventoryState {
  date: Date | undefined;
}

const initialState: InventoryState = {
  date: undefined,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventoryDate: (
      state: InventoryState,
      action: PayloadAction<Date | undefined>,
    ) => {
      state.date = action.payload;
    },
  },
});

export const {setInventoryDate} = inventorySlice.actions;

export default inventorySlice.reducer;
