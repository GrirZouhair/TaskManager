import { axiosClient } from "../Api/axios";
import { headers } from "./getHeaders";
import { userId } from "../functions/getUserId";

export const fetchTasks = async () => {
  try {
    const res = await axiosClient.get(`/tasks/all/${userId}`, {
      headers,
    });
    return res.data.task;
  } catch (error) {
    console.error("Erreur lors de la récupération des employés:", error);
  }
};

export const finishedTasks = async () => {
  const tasks = await fetchTasks();
  const finishedTasks =
    tasks && tasks.filter((task: any) => task.status === "revoir");
  return finishedTasks;
};
