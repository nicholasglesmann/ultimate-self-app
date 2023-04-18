import { useState, useEffect, useCallback } from "react";
import Modal from "../../../components/Modal";
import NewTaskForm from "./NewTaskForm";
import Toast, { TOAST_TYPES } from "../../../components/Toast";

const newTaskFormId = "taskForm";

const NewTaskButtonAndModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleNewTaskCreated = () => {
    setIsOpen(false);
    console.log("Task created!");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

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
          <NewTaskForm successCallback={handleNewTaskCreated} />
        </Modal>
      )}
      {showToast && (
        <Toast message="Task created!" type={TOAST_TYPES.SUCCESS} closeCallback={() => setShowToast(false)} />
      )}
    </>
  );
};

export default NewTaskButtonAndModal;
