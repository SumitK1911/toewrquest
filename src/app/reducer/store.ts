import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import pointsReducer from '@/app/reducer/pointsSlice';


const store = configureStore({
  reducer: {
    points: pointsReducer,
    // Add other reducers if any
  },
});

// Define RootState type to include points and currentFloor properties
export type RootState = ReturnType<typeof store.getState> & {
  points: ReturnType<typeof pointsReducer>;
};

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
