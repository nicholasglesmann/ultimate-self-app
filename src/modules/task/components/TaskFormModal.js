import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import TaskForm from "./TaskForm";
import { TOAST_TYPES } from "../../../components/Toast";
import { subscribe, unsubscribe, publish, SHOW_TASK_FORM_MODAL, SHOW_TOAST } from "../../../utils/Event";

const taskFormId = "taskForm";

const TaskFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [record, setRecord] = useState(null);

  const handleNewTaskCreated = () => {
    setIsOpen(false);
    console.log("Task created!");
    publish(SHOW_TOAST, { message: "Task Created!", type: TOAST_TYPES.SUCCESS });
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
          <TaskForm successCallback={handleNewTaskCreated} existingRecord={record} />
        </Modal>
      )}
    </>
  );
};

export default TaskFormModal;
