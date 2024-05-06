import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/reducer/store';

interface PointsState {
  points: number;
  currentFloor: number;
}

const initialState: PointsState = {
  points: 100, // Initial points
  currentFloor: 0, // Initial floor
};

const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    decrementPoints: (state, action: PayloadAction<number>) => {
      state.points -= action.payload;
    },
    incrementPoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload;
    },
    setCurrentFloor: (state, action: PayloadAction<number>) => {
      state.currentFloor = action.payload;
    },
  },
});

export const { decrementPoints, incrementPoints, setCurrentFloor } = pointsSlice.actions;

export const selectPoints = (state: RootState) => state.points.points;
export const selectCurrentFloor = (state: RootState) => state.points.currentFloor;

export default pointsSlice.reducer;
