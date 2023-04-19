import React, { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import DateTimePicker from "../../../components/DateTimePicker";
import formStyles from "../../../styles/formStyles";

const defaultTaskLengthMinutes = 30; // should be a setting
const defaultTaskLengthMilliseconds = defaultTaskLengthMinutes * 60000;

function NewTaskForm({ successCallback, failureCallback }) {
  const now = Date.now() - new Date().getTimezoneOffset() * 60000;
  const defaultStartDateTime = new Date(now - defaultTaskLengthMilliseconds);
  const defaultEndDateTime = new Date(now);

  const supabase = useSupabaseClient();

  const [categoryList, setCategoryList] = useState(() => []);
  const [taskList, setTaskList] = useState(() => []);

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategory] = useState("");

  // default is "now" - defaultTaskLength in the user's timezone
  const [startDateTime, setStartDateTime] = useState(() => defaultStartDateTime);

  // default is "now" in the user's timezone
  const [endDateTime, setEndDateTime] = useState(() => defaultEndDateTime);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // do some validation first
      const categoryId = await upsertCategoryRecord();
      const taskId = await upsertTaskRecord(categoryId);
      await upsertUserTaskRecord(taskId);
      successCallback();
    } catch (error) {
      console.log(error);
    }
  };

  const upsertCategoryRecord = async () => {
    const existingCategoryMatches = categoryList.filter((category) => category.name === categoryName);

    const newCategory = {
      name: categoryName,
    };

    // add the id of the Category if it exists already
    if (existingCategoryMatches.length) {
      newCategory.id = existingCategoryMatches[0].id;
    }

    let { data, error } = await supabase.from("category").upsert(newCategory).select();
    if (error) throw error;
    return data[0].id;
  };

  const upsertTaskRecord = async (categoryId) => {
    const existingTaskMatches = taskList.filter((task) => task.name === taskName);

    const newTask = {
      name: taskName,
      description: description,
      category_id: categoryId,
    };

    // add the id of the task if it exists already
    if (existingTaskMatches.length) {
      newTask.id = existingTaskMatches[0].id;
    }

    let { data, error } = await supabase.from("task").upsert(newTask).select();
    if (error) throw error;
    return data[0].id;
  };

  const upsertUserTaskRecord = async (taskId) => {
    const userTask = {
      task_id: taskId,
      start_date_time: startDateTime.toISOString(),
      end_date_time: endDateTime.toISOString(),
    };

    let { error } = await supabase.from("user_task").insert(userTask);
    if (error) throw error;
  };

  useEffect(() => {
    const getExistingTasks = async () => {
      const { data, error } = await supabase.from("task").select().order("name");
      if (error) throw error;
      setTaskList(data);
    };
    const getExistingCategories = async () => {
      const { data, error } = await supabase.from("category").select().order("name");
      if (error) throw error;
      setCategoryList(data);
    };
    getExistingTasks();
    getExistingCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="w-full p-2 lg:mx-auto lg:w-96" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="taskname">
          Task Name:
        </label>
        <input
          type="text"
          id="taskname"
          list="tasknames"
          name="taskname"
          className={formStyles.input}
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
        />
        <datalist id="tasknames">
          {taskList.map((task) => (
            <option key={task.id} value={task.name}></option>
          ))}
        </datalist>
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="category">
          Category:
        </label>
        <input
          id="category"
          list="categoryList"
          name="category"
          className={formStyles.input}
          value={categoryName}
          onChange={(event) => setCategory(event.target.value)}
        />
        <datalist id="categoryList">
          {categoryList.map((task) => (
            <option key={task.id} value={task.name}></option>
          ))}
        </datalist>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          rows="3"
          className={formStyles.input}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </div>

      <div className="mb-4 flex justify-between">
        <div className="mr mb-4 md:mb-0">
          <DateTimePicker label="Start Date:" defaultDate={startDateTime} onChangeDateTime={setStartDateTime} />
        </div>
        <div className="ml-4">
          <DateTimePicker label="End Date:" defaultDate={endDateTime} onChangeDateTime={setEndDateTime} />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Log Task
        </button>
      </div>
    </form>
  );
}

export default NewTaskForm;
