import NewTaskButtonAndModal from "../modules/task/components/NewTaskButtonAndModal";
import TaskList from "../modules/task/components/TaskList";

export const task = () => {
  console.log("rerendering task page");
  return (
    <div>
      <div className="px-1 pt-1 md:px-4 md:pt-4">
        <NewTaskButtonAndModal />
        <TaskList />
      </div>
    </div>
  );
};

export default task;
