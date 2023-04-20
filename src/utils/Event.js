function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener);
}

function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener);
}

function publish(eventName, data) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe };

export const SHOW_TOAST = "show-toast";
export const SHOW_TASK_FORM_MODAL = "show-task-form-modal";
export const SHOW_DELETE_TASK_MODAL = "show-delete-task-modal";
export const ADDED_USER_TASK = "added-user-task";
export const DELETED_USER_TASK = "deleted-user-task";
