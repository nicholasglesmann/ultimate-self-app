import { useEffect, useState } from "react";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import DeleteTaskModal from "./DeleteTaskModal";
import NewTaskButton from "./NewTaskButton";
import TaskFormModal from "./TaskFormModal";
import TaskList from "./TaskList";

import { subscribe, unsubscribe, DELETED_USER_TASK, ADDED_USER_TASK, UPDATED_USER_TASK } from "../../../utils/Event";
import TaskSummary from "./TaskSummary";

export const TaskLogContainer = () => {
  const supabase = useSupabaseClient();

  const [existingCategories, setExistingCategories] = useState(() => []);
  const [existingTasks, setExistingTasks] = useState(() => []);

  const [today, setToday] = useState(() => new Date());
  const [lowerBoundDate, setLowerBoundDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [upperBoundDate, setUpperBoundDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
  );

  const [userTaskData, setUserTaskData] = useState(() => []);

  // Event Listeners
  useEffect(() => {
    subscribeToEvents();

    return () => unsubscribeToEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subscribeToEvents = () => {
    subscribe(ADDED_USER_TASK, handleUserTaskChange);
    subscribe(UPDATED_USER_TASK, handleUserTaskChange);
    subscribe(DELETED_USER_TASK, handleUserTaskChange);
  };

  const unsubscribeToEvents = () => {
    unsubscribe(ADDED_USER_TASK, handleUserTaskChange);
    unsubscribe(UPDATED_USER_TASK, handleUserTaskChange);
    unsubscribe(DELETED_USER_TASK, handleUserTaskChange);
  };

  const handleUserTaskChange = () => {
    queryAllData();
  };

  useEffect(() => {
    queryAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchExistingUserTasks = async () => {
    try {
      console.log("Querying User Task data");

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

  const fetchExistingTasks = async () => {
    console.log("Querying Task data");
    const { data, error } = await supabase.from("task").select().order("name");
    if (error) throw error;
    setExistingTasks(data);
  };

  const fetchExistingCategories = async () => {
    console.log("Querying Category data");
    const { data, error } = await supabase.from("category").select().order("name");
    if (error) throw error;
    setExistingCategories(data);
  };

  const queryAllData = async () => {
    await Promise.all([fetchExistingUserTasks(), fetchExistingTasks(), fetchExistingCategories()]);
  };

  return (
    <div className="px-1 pt-4 md:px-4">
      <div className="2xl:grid-cols-3 grid gap-4 xl:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <NewTaskButton />
          <TaskSummary userTaskData={userTaskData} />
        </div>
        <div className="xl:col-span-2">
          <TaskList userTaskData={userTaskData} />
        </div>
      </div>
      <TaskFormModal existingTasks={existingTasks} existingCategories={existingCategories} />
      <DeleteTaskModal />
    </div>
  );
};

// move to utility
function sortUserTaskDataByStartDate(data) {
  return data.sort((a, b) => {
    return Date.parse(a.start_date_time) - Date.parse(b.start_date_time);
  });
}

export default TaskLogContainer;
