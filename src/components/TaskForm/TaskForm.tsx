import React, {useState} from 'react';
import {ApiTask} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {fetchTaskPost, fetchTasks} from "../../container/Tasks/tasksThunks";

const TaskForm = () => {
  const dispatch = useAppDispatch();

  const [task, setTask] = useState<ApiTask>({
    title: '',
    status: false,
  });

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(prev => ({...prev, title: e.target.value}));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(fetchTaskPost(task));
    await dispatch(fetchTasks());
    setTask({
      title: '',
      status: false,
    });
  };

  return (
    <div className="d-flex justify-content-center">
      <form className="m-2 p-1 w-50"
            onSubmit={onFormSubmit}>
        <div className="form-group">
          <label className="fs-3" htmlFor="task">Add new task:</label>
          <input
            placeholder="Just do it!"
            type="text"
            className="form-control"
            value={task.title}
            onChange={onFormChange}
          />

          <button className="btn btn btn-primary mt-3" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;