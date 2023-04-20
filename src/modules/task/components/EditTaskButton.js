import { publish, SHOW_TASK_FORM_MODAL } from "../../../utils/Event";
import Pencil from "../../icons/components/Pencil";

const EditTaskButton = ({ record, styles }) => {
  return (
    <>
      <button
        className={styles || "font-medium text-blue-600 hover:underline dark:text-blue-500"}
        type="button"
        onClick={() => publish(SHOW_TASK_FORM_MODAL, record)}
      >
        <div className="flex items-center">
          <Pencil />
          <span className="ml-2">Edit Task</span>
        </div>
      </button>
    </>
  );
};

export default EditTaskButton;
