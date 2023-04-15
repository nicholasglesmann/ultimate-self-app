import { useState } from "react";
import Modal from "../components/Modal";
import NewTaskForm from "../modules/task/components/NewTaskForm";

const newTaskFormId = "taskForm";

export const task = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* <!-- Modal toggle --> */}
      <button
        data-modal-target={newTaskFormId}
        data-modal-toggle={newTaskFormId}
        className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Log New Task
      </button>
      {isOpen && (
        <Modal id={newTaskFormId} setIsOpen={setIsOpen}>
          <NewTaskForm />
        </Modal>
      )}
    </>
  );
};

export default task;
