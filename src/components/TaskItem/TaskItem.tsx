import React, {useState} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {fetchTaskUpdate, fetchTaskDelete, fetchTasks} from "../../container/Tasks/tasksThunks";

interface PropsTaskItem {
  id: string;
  title: string;
  status: boolean;
}

const TaskItem: React.FC<PropsTaskItem> = ({id, title,status}) => {
  const dispatch = useAppDispatch();

  const onDeleteTask = async () => {
    await dispatch(fetchTaskDelete(id));
    await dispatch(fetchTasks());
  }

  const onChangeCheckbox = async () => {
    const changedTask = {
      id,
      title,
      status,
    }
    await dispatch(fetchTaskUpdate(changedTask));
    await dispatch(fetchTasks());
  }

  return (
    <div className="card w-50 m-1 p-2">
    <div className="d-flex justify-content-between align-items-center">
      <h2 className="ps-3">{title}</h2>
      <div className="d-flex align-items-center">
      <input
        className="form-check-input m-0"
        type="checkbox"
        checked={status}
        onChange={onChangeCheckbox}
      />
      <button
        className="btn btn-danger m-2"
        onClick={onDeleteTask}
      >Delete
      </button>
      </div>
    </div>
    </div>
  );
};

export default TaskItem;