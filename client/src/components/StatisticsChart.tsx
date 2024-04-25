import Chart from "chart.js/auto";
import { ChartConfiguration, ChartData } from "chart.js";
import { useEffect, useState } from "react";
import { axiosClient } from "../Api/axios";

interface TaskStatistics {
  OverDeadLine: number;
  finishedTask: number;
  unFinishedTask: number;
  numberOfTasks: number;
}

function StatisticsChart() {
  const [tasksStatistics, setTaskStatistics] = useState<TaskStatistics | null>(null);

  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/tasks/tasksStatictis", {
          headers,
        });
        setTaskStatistics({
          OverDeadLine: res.data.OverDeadLine.number,
          finishedTask: res.data.finishedTask.number,
          unFinishedTask: res.data.unFinishedTask.number,
          numberOfTasks: res.data.numberOfTasks,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchData();
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
      labels: ["Over Deadline", "Finished", "Unfinished"],
      datasets: [
        {
          label: "Tasks Statistics",
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

    const chartOptions: ChartConfiguration = {
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
            label: (context) => `${context.label}: ${context.data[0]}`,
          },
        },
      },
    };

    new Chart(ctx, chartOptions);
  };

  return (
    <div className="mt-5">
      {tasksStatistics && (
        <canvas id="doughnutChart" width={400} height={400}></canvas>
      )}
    </div>
  );
}

export default StatisticsChart;
