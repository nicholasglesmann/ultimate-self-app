import { useState, useEffect, use } from "react";
import Modal from "../../../components/Modal";
import { TOAST_TYPES } from "../../../components/Toast";
import {
  subscribe,
  unsubscribe,
  publish,
  SHOW_DELETE_TASK_MODAL,
  SHOW_TOAST,
  DELETED_USER_TASK,
} from "../../../utils/Event";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const deleteTaskId = "deleteTask";

const DeleteTaskModal = () => {
  const supabase = useSupabaseClient();

  const [isOpen, setIsOpen] = useState(false);
  const [record, setRecord] = useState(null);

  const handleDeleteTask = async () => {
    setIsOpen(false);

    try {
      const { error } = await supabase.from("user_task").delete().eq("id", record.id);
      if (error) throw error;
      publish(SHOW_TOAST, { message: "Task Deleted!", type: TOAST_TYPES.SUCCESS });
      publish(DELETED_USER_TASK, record);
    } catch (error) {
      publish(SHOW_TOAST, { message: "ERROR AHHHHHHHH: " + error, type: TOAST_TYPES.SUCCESS });
    }
  };

  const handleShowDeleteTaskModal = (event) => {
    setIsOpen(true);
    setRecord(event?.detail);
  };

  useEffect(() => {
    subscribe(SHOW_DELETE_TASK_MODAL, handleShowDeleteTaskModal);

    return () => unsubscribe(SHOW_DELETE_TASK_MODAL, handleShowDeleteTaskModal);
  }, []);

  return (
    <>
      {isOpen && (
        <Modal id={deleteTaskId} setIsOpen={setIsOpen}>
          <div className="mx-2 mt-2">
            <div>Are you sure you want to delete &quot;{record?.task?.name}&quot;?</div>
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                className="rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => handleDeleteTask()}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DeleteTaskModal;
