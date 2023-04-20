import Trash from "../../icons/components/Trash";
import { publish, SHOW_DELETE_TASK_MODAL } from "../../../utils/Event";

const DeleteTaskButton = ({ record, styles }) => {
  const deleteUserTask = () => {
    publish(SHOW_DELETE_TASK_MODAL, record);
  };

  return (
    <>
      <button
        className={styles || "font-medium text-blue-600 hover:underline dark:text-blue-500"}
        type="button"
        onClick={() => deleteUserTask()}
      >
        <div className="flex items-center">
          <Trash />
          <span className="ml-2">Delete Task</span>
        </div>
      </button>
    </>
  );
};

export default DeleteTaskButton;
