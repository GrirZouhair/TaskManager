import { axiosClient } from "../Api/axios";
import { headers } from "./getHeaders";

export const fetchTasks = async () => {
  try {
    const res = await axiosClient.get("/tasks/all", {
      headers,
    });
    return res.data.task;
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

export const finishedTasks = async () => {
  const tasks = await fetchTasks();
  const finishedTasks =
    tasks && tasks.filter((task: any) => task.status === "fait");
  return finishedTasks;
};
