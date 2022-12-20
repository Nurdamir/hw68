import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ApiTasksList, Task} from "../../types";
import {RootState} from "../../app/store";

export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetchTasks',
  async () => {
    const tasksResponse = await axiosApi.get<ApiTasksList | null>('/tasks.json');
    const tasks = tasksResponse.data;

    let newTasks: Task[] = [];

    if (tasks) {
      newTasks = Object.keys(tasks).map(id => {
        const task = tasks[id];
        return {
          ...task,
          id
        }
      });
    }
    return newTasks;
  }
);

export const fetchTaskPost = createAsyncThunk<void, Task>(
  'task/fetchPost',
  async (task) => {
    await axiosApi.post('/tasks.json', task);
  }
);

export const fetchTaskDelete = createAsyncThunk<void, string>(
  'task/fetchTaskDelete',
  async (id) => {
    await axiosApi.delete('/tasks/' + id + '.json');
  }
);

export const fetchTaskUpdate = createAsyncThunk<void, Task, {state: RootState}>(
  'task/fetchTaskChange',
  async (task) => {
    const updatedTask = {
      id: task.id,
      title: task.title,
      status: !task.status
    }
    await axiosApi.put('/tasks/' + task.id + '.json', updatedTask);
  }
);

