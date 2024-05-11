import Chart from "chart.js/auto";
import { ChartData } from "chart.js";
import { useEffect, useState } from "react";
import { fetchData } from "../functions/getStatistics";

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
      const data: any = await fetchData();
      setTaskStatistics(data);
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
