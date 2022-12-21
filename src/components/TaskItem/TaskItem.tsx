import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTaskDelete, fetchTasks, fetchTaskUpdate} from "../../container/Tasks/tasksThunks";
import {selectOnDelLoad, selectUpdateLoad} from "../../container/Tasks/tasksSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface PropsTaskItem {
  id: string;
  title: string;
  status: boolean;
}

const TaskItem: React.FC<PropsTaskItem> = ({id, title, status}) => {
  const dispatch = useAppDispatch();
  const onDelLoad = useAppSelector(selectOnDelLoad);
  const updateLoad = useAppSelector(selectUpdateLoad);

  const onDeleteTask = async () => {
    await dispatch(fetchTaskDelete(id));
    await dispatch(fetchTasks());
  };

  const onChangeCheckbox = async () => {
    const changedTask = {
      id,
      title,
      status,
    }
    await dispatch(fetchTaskUpdate(changedTask));
    await dispatch(fetchTasks());
  };


  return (
    <div className="card w-75 m-1 p-2">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="ps-3 m-0 overflow-hidden">{title}</h2>
        <div className="d-flex justify-content-around align-items-center">
          <div className="ms-2" style={{width: '30px', height: '30px'}}>
            {updateLoad && updateLoad === id && <ButtonSpinner/>}
          </div>
          <input
            disabled={updateLoad ? updateLoad === id : false}
            className="form-check-input m-0 me-1 ms-2"
            type="checkbox"
            checked={status}
            onChange={onChangeCheckbox}
          />
          <div style={{width: '150px', height: '70px'}}>
            <button
              className="btn btn-danger m-2"
              onClick={onDeleteTask}
              disabled={onDelLoad ? onDelLoad === id : false}
            >{onDelLoad && onDelLoad === id && <ButtonSpinner/>}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;