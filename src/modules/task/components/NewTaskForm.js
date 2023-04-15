import React, { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import DateTimePicker from "../../../components/DateTimePicker";
import formStyles from "../../../styles/formStyles";

const defaultTaskLengthMinutes = 30; // should be a setting
const defaultTaskLengthMilliseconds = defaultTaskLengthMinutes * 60000;
const now = Date.now() - new Date().getTimezoneOffset() * 60000;
const defaultStartDateTime = new Date(now - defaultTaskLengthMilliseconds);
const defaultEndDateTime = new Date(now);

function NewTaskForm({ successCallback, failureCallback }) {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // default is "now" - defaultTaskLength in the user's timezone
  const [startDateTime, setStartDateTime] = useState(() => defaultStartDateTime);

  // default is "now" in the user's timezone
  const [endDateTime, setEndDateTime] = useState(() => defaultEndDateTime);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // do some validation first
      const taskId = await upsertTaskRecord();
      await upsertUserTaskRecord(taskId);
    } catch (error) {
      console.log(error);
    }
  };

  const upsertTaskRecord = async () => {
    const newTask = {
      name: taskName,
      description: description,
    };

    let { data, error } = await supabase.from("task").upsert(newTask, { onConflict: "name" }).select();
    if (error) throw error;
    return data[0].id;
  };

  const upsertUserTaskRecord = async (taskId) => {
    const userTask = {
      user_id: user.id,
      task_id: taskId,
      start_date_time: startTime,
      end_date_time: endTime,
    };

    let { error } = await supabase.from("user_task").insert(userTask);
    if (error) throw error;
  };

  return (
    <form className="w-full p-2 lg:mx-auto lg:w-96" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="taskname">
          Task Name:
        </label>
        <input
          type="text"
          id="taskname"
          name="taskname"
          className={formStyles.input}
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="category">
          Category:
        </label>
        <select
          id="category"
          name="category"
          className={formStyles.input}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="other">Other</option>
        </select>
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
