import { useState, useEffect, useCallback } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFormattedTimeStringFromString } from "../../../utils/DateTime";
import TaskActions from "./TaskActions";
import { subscribe, publish, unsubscribe, DELETED_USER_TASK, ADDED_USER_TASK } from "../../../utils/Event";

const oddRowClasses = "border-b bg-white dark:border-gray-700 dark:bg-gray-900 last:border-none";
const evenRowClasses = "border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800 last:border-none";

const TaskList = () => {
  const supabase = useSupabaseClient();

  const [today, setToday] = useState(() => new Date());
  const [lowerBoundDate, setLowerBoundDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [upperBoundDate, setUpperBoundDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
  );

  const [userTaskData, setUserTaskData] = useState(() => {
    console.log("resetting");
    return [];
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upperBoundDate, lowerBoundDate]);

  // Event Listeners
  useEffect(() => {
    subscribeToEvents();

    return () => unsubscribeToEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      console.log("Querying data");

      const { data, error } = await supabase
        .from("user_task")
        .select(
          `
            id,
            start_date_time,
            end_date_time,
            user_id,
            task_id,
            task:task_id (
              id,
              name,
              category_id,
              category:category_id (
                id,
                name
              ),
              description
            )
          `
        )
        .gte("start_date_time", lowerBoundDate.toISOString())
        .lte("start_date_time", upperBoundDate.toISOString());

      if (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
      const sortedData = sortUserTaskDataByStartDate(data);
      setUserTaskData(sortedData);
    } catch (error) {
      console.error("Error executing query:", error);
    }
  };

  const subscribeToEvents = () => {
    subscribe(ADDED_USER_TASK, handleUserTaskChange);
    subscribe(DELETED_USER_TASK, handleUserTaskChange);
  };

  const unsubscribeToEvents = () => {
    unsubscribe(ADDED_USER_TASK, handleUserTaskChange);
    unsubscribe(DELETED_USER_TASK, handleUserTaskChange);
  };

  const handleUserTaskChange = (event) => {
    fetchData();
  };

  console.log(userTaskData);

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-0 shadow dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="relative overflow-hidden overflow-x-auto border shadow-md dark:border-gray-700 sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-1 md:px-6">
                Task
              </th>
              <th scope="col" className="hidden px-6 py-1 md:table-cell">
                Catagory
              </th>
              <th scope="col" className="px-2 py-1 text-right md:px-6">
                Start
              </th>
              <th scope="col" className="px-2 py-1 text-right md:px-6">
                End
              </th>
              <th scope="col" className="px-6 py-1 md:table-cell"></th>
            </tr>
          </thead>
          <tbody>
            {!userTaskData ? (
              <tr className={oddRowClasses}>
                <th scope="row" className=" animate-pulse px-2 py-1 font-medium text-gray-900 dark:text-white md:px-6">
                  <div className="h-2.5 w-48 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </th>
                <td className="hidden px-6 py-1 md:table-cell">
                  <div className="h-2.5 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </td>
                <td className="whitespace-nowrap px-2 py-1 text-right md:px-6">
                  <div className="h-2.5 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </td>
                <td className="whitespace-nowrap px-2 py-1 text-right md:px-6">
                  <div className="h-2.5 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </td>
                <td className="px-6 py-1 md:table-cell">
                  <div className="h-2.5 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </td>
              </tr>
            ) : (
              userTaskData.map((userTaskData, index) => createTaskRow(userTaskData, index))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function sortUserTaskDataByStartDate(data) {
  return data.sort((a, b) => {
    return Date.parse(a.start_date_time) - Date.parse(b.start_date_time);
  });
}

function createTaskRow(record, index) {
  const currentRowClasses = index % 2 === 0 ? evenRowClasses : oddRowClasses;

  return (
    <tr key={record.id} className={currentRowClasses}>
      <th scope="row" className=" px-2 py-0 font-medium text-gray-900 dark:text-white md:px-6">
        {record.task?.name}
      </th>
      <td className="hidden px-6 py-0 md:table-cell">{record.task?.category?.name}</td>
      <td className="whitespace-nowrap px-2 py-0 text-right md:px-6">
        {getFormattedTimeStringFromString(record?.start_date_time)}
      </td>
      <td className="whitespace-nowrap px-2 py-0 text-right md:px-6">
        {getFormattedTimeStringFromString(record?.end_date_time)}
      </td>
      <td className="w-12 px-1 py-0 text-right">
        <TaskActions record={record} />
      </td>
    </tr>
  );
}

export default TaskList;
