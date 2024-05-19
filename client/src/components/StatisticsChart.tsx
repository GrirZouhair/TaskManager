import Chart from "chart.js/auto";
import { ChartData } from "chart.js";
import { useEffect, useState } from "react";
import { axiosClient } from "../Api/axios";

interface TaskStatistics {
  OverDeadLine: number;
  finishedTask: number;
  unFinishedTask: number;
  numberOfTasks: number;
}

function StatisticsChart() {
  const [tasksStatistics, setTaskStatistics] = useState<TaskStatistics | null>(
    null
  );

  useEffect(() => {
    const fetch = async () => {
      const userItem = localStorage.getItem("user");
      const userId = userItem ? JSON.parse(userItem).id : null;
      const token = localStorage.getItem("token");

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axiosClient.get(`/tasks/tasksStatictis/${userId}`, {
          headers,
        });
        setTaskStatistics({
          OverDeadLine: res.data.OverDeadLine.number,
          finishedTask: res.data.finishedTask.number,
          unFinishedTask: res.data.unFinishedTask.number,
          numberOfTasks: res.data.numberOfTasks,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des statistiques:",
          error
        );
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (tasksStatistics) {
      renderChart();
    }
  }, [tasksStatistics]);

  const renderChart = () => {
    const ctx = document.getElementById(
      "doughnutChart"
    ) as HTMLCanvasElement | null;
    if (!ctx || !tasksStatistics) return;

    // Destroy existing chart instance (if any)
    const existingChart = Chart.getChart("doughnutChart");
    if (existingChart) {
      existingChart.destroy();
    }

    const chartData: ChartData = {
      labels: ["En retard", "Terminé", "Inachevé"],
      datasets: [
        {
          label: "Statistiques des tâches",
          data: [
            tasksStatistics.OverDeadLine,
            tasksStatistics.finishedTask,
            tasksStatistics.unFinishedTask,
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };

    const chartOptions: any = {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "#333",
            fontSize: 14,
          },
        },
        tooltips: {
          backgroundColor: "#fff",
          bodyFontColor: "#333",
          callbacks: {
            label: (context: any) => `${context.label}: ${context.data[0]}`,
          },
        },
      },
    };

    new Chart(ctx, chartOptions);
  };

  return (
    <div className="mt-5 col-10 col-md-4">
      {tasksStatistics && (
        <canvas id="doughnutChart" width={400} height={400}></canvas>
      )}
    </div>
  );
}

export default StatisticsChart;
