import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import filtersReducer from './slices/filtersSlice';
import appReducer from './slices/appSlice';
import { loadState, saveState } from '../utils/localStorage';

// Load persisted state from localStorage
const persistedState = loadState();

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
    app: appReducer,
  },
  preloadedState: persistedState,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks,
    filters: store.getState().filters,
  });
});

export default store;

