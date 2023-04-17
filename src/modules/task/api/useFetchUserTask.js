import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

export const useFetchUserTaskByDates = (lowerBoundDate, upperBoundDate) => {
  const supabase = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(false);
  const [userTaskData, setUserTaskData] = useState(null);
  const [serverError, setServerError] = useState(null);

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

  return userTaskData;
};
