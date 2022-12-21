import {createSlice} from "@reduxjs/toolkit";
import {Task} from "../../types";
import {fetchTaskDelete, fetchTaskPost, fetchTasks, fetchTaskUpdate} from "./tasksThunks";
import {RootState} from "../../app/store";

interface TasksState {
  items: Task[],
  loading: boolean,
  onDelLoading: false | string,
  createLoading: boolean,
  updateLoad: false | string,
}

const initialState: TasksState = {
  items: [],
  loading: false,
  onDelLoading: false,
  createLoading: false,
  updateLoad: false,
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

    builder.addCase(fetchTaskDelete.pending, (state, {meta: {arg: taskId}}) => {
      state.onDelLoading = taskId;
    });
    builder.addCase(fetchTaskDelete.fulfilled, (state) => {
      state.onDelLoading = false;
    });
    builder.addCase(fetchTaskDelete.rejected, (state) => {
      state.onDelLoading = false;
    });

    builder.addCase(fetchTaskPost.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(fetchTaskPost.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(fetchTaskPost.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchTaskUpdate.pending, (state, {meta: {arg: id}}) => {
      state.updateLoad = id.id!;
    });
    builder.addCase(fetchTaskUpdate.fulfilled, (state) => {
      state.updateLoad = false;
    });
    builder.addCase(fetchTaskUpdate.rejected, (state) => {
      state.updateLoad = false;
    });
  }
});

export const selectOnDelLoad = (state: RootState) => state.tasks.onDelLoading;
export const selectCreateLoad = (state: RootState) => state.tasks.createLoading;
export const selectUpdateLoad = (state: RootState) => state.tasks.updateLoad;
export const selectTasksItems = (state: RootState) => state.tasks.items;
export const selectTasksLoading = (state: RootState) => state.tasks.loading;

export const tasksReducer = tasksSlice.reducer;