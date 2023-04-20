import DeleteTaskModal from "../modules/task/components/DeleteTaskModal";
import NewTaskButton from "../modules/task/components/NewTaskButton";
import TaskFormModal from "../modules/task/components/TaskFormModal";
import TaskList from "../modules/task/components/TaskList";

export const task = () => {
  console.log("Rendering task page");
  return (
    <div className="px-1 pt-4 md:px-4">
      <div className="2xl:grid-cols-3 grid gap-4 xl:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <NewTaskButton />
        </div>
        <div className="xl:col-span-2">
          <TaskList />
        </div>
      </div>
      <TaskFormModal />
      <DeleteTaskModal />
    </div>
  );
};

export default task;
