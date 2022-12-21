import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTaskPost, fetchTasks} from "../../container/Tasks/tasksThunks";
import {selectCreateLoad} from "../../container/Tasks/tasksSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {ApiTask} from "../../types";

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const createLoad = useAppSelector(selectCreateLoad);

  const [task, setTask] = useState<ApiTask>({
    title: '',
    status: false,
  });

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(prev => ({...prev, title: e.target.value}));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task.title.length > 0) {
      await dispatch(fetchTaskPost(task));
      await dispatch(fetchTasks());
      setTask({
        title: '',
        status: false,
      });
    } else {
      alert('Заполните поле!')
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form className="m-2 p-1 w-75"
            onSubmit={onFormSubmit}>
        <div className="form-group">
          <label className="fs-3" htmlFor="task">Create new task:</label>
          <input
            placeholder="Just do it!"
            type="text"
            className="form-control"
            value={task.title}
            onChange={onFormChange}
          />
          <button
            className="btn btn btn-primary mt-3"
            disabled={createLoad}
            type="submit">
            {createLoad ? <ButtonSpinner/> : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;