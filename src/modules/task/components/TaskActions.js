import { useEffect, useRef } from "react";
import EditTaskButton from "./EditTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";

const TaskActions = ({ record }) => {
  let hideMenuListener = useRef(null);

  const handleMenuIconClick = (event) => {
    const menuButton = document.getElementById(record.id + "dropdownMenuIconButton");
    const left = menuButton.getBoundingClientRect().left;
    const top = menuButton.getBoundingClientRect().top;

    const menuDiv = document.getElementById(record.id + "dropdownDots");
    menuDiv.classList.remove("invisible");
    menuDiv.classList.add("visible");
    menuDiv.style.top = top + "px";
    const leftPosition = left - 180;
    menuDiv.style.left = leftPosition + "px";

    // must be added after DOM render
    setTimeout(() => {
      hideMenuListener = window.addEventListener(
        "click",
        () => {
          const menuDiv = document.getElementById(record.id + "dropdownDots");
          menuDiv.classList.add("invisible");
          menuDiv.classList.remove("visible");
        },
        { once: true }
      );
    });
  };

  useEffect(() => {
    return () => window.removeEventListener("click", hideMenuListener);
  });

  return (
    <div className="relative">
      <button
        id={record.id + "dropdownMenuIconButton"}
        onClick={handleMenuIconClick}
        data-dropdown-toggle={record.id + "dropdownDots"}
        className="inline-flex items-center rounded-lg p-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
        </svg>
      </button>

      <div
        id={record.id + "dropdownDots"}
        className="invisible fixed z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-lg dark:divide-gray-600 dark:bg-gray-700"
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
          <li>
            <EditTaskButton
              record={record}
              styles="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            />
          </li>
        </ul>
        <div className="py-2">
          <DeleteTaskButton
            record={record}
            styles="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:text-red-600 dark:hover:bg-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskActions;
