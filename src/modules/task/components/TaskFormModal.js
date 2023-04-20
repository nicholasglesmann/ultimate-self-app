import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import TaskForm from "./TaskForm";
import { subscribe, unsubscribe, SHOW_TASK_FORM_MODAL } from "../../../utils/Event";

const taskFormId = "taskForm";

const TaskFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [record, setRecord] = useState(null);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleShowTaskFormModal = (event) => {
    setIsOpen(true);
    setRecord(event?.detail);
  };

  useEffect(() => {
    subscribe(SHOW_TASK_FORM_MODAL, handleShowTaskFormModal);

    return () => unsubscribe(SHOW_TASK_FORM_MODAL, handleShowTaskFormModal);
  }, []);

  return (
    <>
      {isOpen && (
        <Modal id={taskFormId} setIsOpen={setIsOpen}>
          <TaskForm successCallback={handleSuccess} existingRecord={record} />
        </Modal>
      )}
    </>
  );
};

export default TaskFormModal;
