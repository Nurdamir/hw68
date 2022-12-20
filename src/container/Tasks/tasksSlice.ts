import {createSlice} from "@reduxjs/toolkit";
import {Task} from "../../types";
import {fetchTasks} from "./tasksThunks";
import {RootState} from "../../app/store";

interface TasksState {
  items: Task[],
  loading: boolean,
}

const initialState: TasksState = {
  items: [],
  loading: false,
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
     state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const selectTasksItems = (state: RootState) => state.tasks.items;
export const selectTasksLoading = (state: RootState) => state.tasks.loading;



export const tasksReducer = tasksSlice.reducer;