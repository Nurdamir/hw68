import React, {ReactElement, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTasksItems, selectTasksLoading} from "./tasksSlice";
import {fetchTasks} from "./tasksThunks";
import TaskItem from "../../components/TaskItem/TaskItem";
import Spinner from "../../components/Spinner/Spinner";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const allTasks = useAppSelector(selectTasksItems);
  const loadingState = useAppSelector(selectTasksLoading);

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch]);

  let content: ReactElement[] | ReactElement = (
    <p className="fs-3 fw-bold">There are no tasks yet!</p>
  );

  if (allTasks.length > 0) {
    content = (
      allTasks.map(item => (
        <TaskItem
          key={item.id}
          id={item.id!}
          title={item.title}
          status={item.status}
        />
      ))
    )
  }

  return (
    <div className="d-flex align-items-center flex-column-reverse">
      {loadingState ? <Spinner/> : content}
    </div>
  );
};

export default Tasks;