import { axiosClient } from "../Api/axios";
import { headers } from "./getHeaders";

export const fetchData = async () => {
  try {
    const res = await axiosClient.get("/tasks/tasksStatictis", {
      headers,
    });
    return {
      OverDeadLine: res.data.OverDeadLine.number,
      finishedTask: res.data.finishedTask.number,
      unFinishedTask: res.data.unFinishedTask.number,
      numberOfTasks: res.data.numberOfTasks,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
  }
};
