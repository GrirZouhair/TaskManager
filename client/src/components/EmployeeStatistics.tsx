import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { AxiosResponse } from "axios";
import { axiosClient } from "../Api/axios";

interface Employee {
  id: number;
  full_name: string;
  email: string;
  points: number;
}

function TaskCompletionChart(): JSX.Element {
  const [chart, setChart] = useState<Chart<"bar"> | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchTasksCompletedData = async () => {
      const userItem = localStorage.getItem("user");
      const userId = userItem ? JSON.parse(userItem).id : null;
      const token = localStorage.getItem("token");

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const res: AxiosResponse<{ employees: Employee[] }> =
          await axiosClient.get(`/firstFiveEmployees/${userId}`, { headers });

        const labels = res.data.employees.map((employee) => employee.full_name);
        const data = res.data.employees.map((employee) => employee.points / 10 );

        if (chartRef.current !== null) {
          const newChart = new Chart(chartRef.current, {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Tâches Accomplies",
                  data: data,
                  backgroundColor: "rgba(75, 192, 192, 0.6)", // Updated color
                  borderColor: "rgba(75, 192, 192, 1)", // Updated border color
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true, // Ensure responsiveness
              plugins: {
                tooltip: {
                  enabled: true,
                  mode: "index",
                  intersect: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Nombre de Tâches Accomplies",
                    font: { size: 14 },
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Employés",
                    font: { size: 14 },
                  },
                },
              },
            },
          });

          setChart(newChart);
        }
      } catch (error) {
        console.error("Error fetching tasks completed data:", error);
      }
    };

    fetchTasksCompletedData();

    return () => {
      if (chart !== null) {
        chart.destroy();
      }
    };
  }, []);

  return (
    <div className="mt-5 col-12 col-md-5">
      <h3 className="text-center">Tâches Accomplies par les Employés</h3>
      <canvas
        id="taskCompletionChart"
        width="400"
        height="200"
        ref={chartRef}
      ></canvas>
    </div>
  );
}

export default TaskCompletionChart;