import { useState, useEffect } from "react";
import GreenCheck from "../modules/icons/components/GreenCheck";

export const TOAST_TYPES = {
  SUCCESS: "SUCCESS",
};

const TOAST_COMPONENTS = {
  SUCCESS: GreenCheck,
};

const Toast = ({ message, type, closeCallback }) => {
  const ToastType = TOAST_COMPONENTS[type];
  if (!ToastType) throw "Unsupported Toast Type";

  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <div
        id="toast"
        class="mb-4 flex w-72 items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
        role="alert"
      >
        <ToastType />
        <div class="ml-3 mr-5 text-sm font-normal">{message}</div>
        <button
          type="button"
          class="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
          aria-label="Close"
          onClick={() => closeCallback()}
        >
          <span class="sr-only">Close</span>
          <svg
            aria-hidden="true"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
