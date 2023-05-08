import { useEffect, useState } from "react";

import {
  getNumSecondsBetweenTwoDateStrings,
  getNumSecondsBetweenTwoDateObjects,
  getFormattedLengthOfTimeFromSeconds,
} from "../../../utils/DateTime";

const oddRowClasses = "border-b bg-white dark:border-gray-700 dark:bg-gray-900 last:border-none";
const evenRowClasses = "border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800 last:border-none";
const unloggedTimeLabel = "Unlogged Time";
const unloggedTimeStyles = "text-red-700 dark:text-red-600";

const TaskSummary = ({ userTaskData }) => {
  const now = Date.now() - new Date().getTimezoneOffset() * 60000;
  const defaultStartTaskLogTime = new Date(now);
  const defaultEndTaskLogTime = new Date(now);

  defaultStartTaskLogTime.setHours(8);
  defaultStartTaskLogTime.setMinutes(0);
  defaultEndTaskLogTime.setHours(22);
  defaultEndTaskLogTime.setMinutes(0);

  const [startTaskLogTime, setStartTaskLogTime] = useState(() => defaultStartTaskLogTime);
  const [endTaskLogTime, setEndTaskLogTime] = useState(() => defaultEndTaskLogTime);

  const [timeSpentByCategory, setTimeSpentByCategory] = useState(() => null);

  useEffect(() => {
    const timeSpentByCategoryTemp = {};

    let totalSecondsSoFarToday = getNumSecondsBetweenTwoDateObjects(
      startTaskLogTime,
      getUnloggedTimeUpperBound(endTaskLogTime)
    );

    userTaskData.forEach((userTask) => {
      const categoryName = userTask?.task?.category?.name;
      const numSeconds = getNumSecondsBetweenTwoDateStrings(userTask.start_date_time, userTask.end_date_time);
      totalSecondsSoFarToday -= numSeconds;
      if (!timeSpentByCategoryTemp[categoryName]) {
        timeSpentByCategoryTemp[categoryName] = numSeconds;
      } else {
        timeSpentByCategoryTemp[categoryName] += numSeconds;
      }
    });

    timeSpentByCategoryTemp[unloggedTimeLabel] = totalSecondsSoFarToday > 0 ? totalSecondsSoFarToday : 0;

    setTimeSpentByCategory(timeSpentByCategoryTemp);
  }, [userTaskData, startTaskLogTime, endTaskLogTime]);

  return (
    <div className="relative overflow-hidden overflow-x-auto border shadow-md dark:border-gray-700 sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-1 text-left md:px-6">
              Category
            </th>
            <th scope="col" className="px-2 py-1 text-right md:px-6">
              Time Spent
            </th>
          </tr>
        </thead>
        <tbody>
          {!timeSpentByCategory ? (
            <tr className={oddRowClasses}>
              <th scope="row" className=" px-2 py-1 font-medium text-gray-900 dark:text-white md:px-6">
                <div className="h-2.5 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </th>
              <td className="whitespace-nowrap px-2 py-1 text-right md:px-6">
                <div className="h-2.5 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </td>
            </tr>
          ) : (
            Object.keys(timeSpentByCategory).map((categoryName, index) =>
              createTaskRow(categoryName, timeSpentByCategory[categoryName], index)
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

function createTaskRow(categoryName, numSeconds, index) {
  const currentRowClasses = index % 2 === 0 ? evenRowClasses : oddRowClasses;

  return (
    <tr key={index} className={currentRowClasses}>
      <th scope="row" className=" px-2 py-1 font-medium text-gray-900 dark:text-white md:px-6">
        <span className={categoryName === unloggedTimeLabel ? unloggedTimeStyles : ""}>{categoryName}</span>
      </th>
      <td className="whitespace-nowrap px-2 py-1 text-right md:px-6">
        <span className={categoryName === unloggedTimeLabel ? unloggedTimeStyles : ""}>
          {getFormattedLengthOfTimeFromSeconds(numSeconds)}
        </span>
      </td>
    </tr>
  );
}

function getUnloggedTimeUpperBound(endTaskLogTime) {
  const currentTime = new Date(Date.now());
  currentTime.setMinutes(Math.round(currentTime.getMinutes() / 5) * 5);
  const unloggedTimeUpperBound = currentTime < endTaskLogTime ? currentTime : endTaskLogTime;
  return unloggedTimeUpperBound;
}

export default TaskSummary;
