import { useState, useEffect } from "react";
import { useFetchUserTaskByDates } from "../api/useFetchUserTask";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const COLUMN_NAMES = ["Task Name", "Catagory", "Start Time", "End Time", "Actions"];

const TaskList = () => {
  const supabase = useSupabaseClient();

  const [today, setToday] = useState(() => new Date());
  const [lowerBoundDate, setLowerBoundDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [upperBoundDate, setUpperBoundDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
  );

  const [userTaskData, setUserTaskData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Querying data");
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log(user);
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
          .eq("user_id", user.id)
          .gte("start_date_time", lowerBoundDate.toISOString())
          .lte("start_date_time", upperBoundDate.toISOString());

        if (error) {
          console.error("Error fetching data:", error);
          return null;
        }
        return data;
      } catch (error) {
        console.error("Error executing query:", error);
        return null;
      }
    };
    fetchData()
      .then((result) => setUserTaskData(result))
      .catch((error) => console.error(error));
  }, [upperBoundDate, lowerBoundDate]);

  console.log(userTaskData);

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-0 shadow dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {COLUMN_NAMES.map((columnName) => (
                <th key={columnName} scope="col" className="px-1 py-3 md:px-6">
                  {columnName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-900">
              <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Edit
                </a>
              </td>
            </tr>
            <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Edit
                </a>
              </td>
            </tr>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-900">
              <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Edit
                </a>
              </td>
            </tr>
            <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                Google Pixel Phone
              </th>
              <td className="px-6 py-4">Gray</td>
              <td className="px-6 py-4">Phone</td>
              <td className="px-6 py-4">$799</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Edit
                </a>
              </td>
            </tr>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-900">
              <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                Apple Watch 5
              </th>
              <td className="px-6 py-4">Red</td>
              <td className="px-6 py-4">Wearables</td>
              <td className="px-6 py-4">$999</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
