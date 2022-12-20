import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTasksItems, selectTasksLoading} from "./tasksSlice";
import TaskItem from "../../components/TaskItem/TaskItem";
import {fetchTasks} from "./tasksThunks";
import Spinner from "../../components/Spinner/Spinner";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const allTasks = useAppSelector(selectTasksItems);
  const loadingState = useAppSelector(selectTasksLoading);


  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  return (
    <div className="d-flex align-items-center flex-column">
      {loadingState ? <Spinner/> : allTasks.map(item => (
        <TaskItem
          key={item.id}
          id={item.id!}
          title={item.title}
          status={item.status}
        />
      ))}
    </div>
  );
};

export default Tasks;