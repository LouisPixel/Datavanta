import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChartState {
  activeIndex: number | null;
}

const initialState: ChartState = {
  activeIndex: null,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setActiveIndex: (state, action: PayloadAction<number | null>) => {
      state.activeIndex = action.payload;
    },
  },
});

export const { setActiveIndex } = chartSlice.actions;
export default chartSlice.reducer;
