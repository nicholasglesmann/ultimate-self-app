import { publish, SHOW_TASK_FORM_MODAL } from "../../../utils/Event";

const NewTaskButton = () => {
  return (
    <>
      {/* <!-- Modal toggle --> */}
      <button
        className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => publish(SHOW_TASK_FORM_MODAL)}
      >
        Log New Task
      </button>
    </>
  );
};

export default NewTaskButton;
