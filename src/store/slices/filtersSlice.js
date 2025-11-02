import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  priorityFilter: 'All', // All, Low, High, Completed
  currentProject: 'Mobile App',
  dateFilter: 'Today', // Today, This Week, This Month, All
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },
  },
});

export const { setSearchQuery, setPriorityFilter, setCurrentProject, setDateFilter } = filtersSlice.actions;
export default filtersSlice.reducer;

