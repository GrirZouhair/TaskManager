import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { AxiosResponse } from "axios";
import { axiosClient } from "../Api/axios";
import { headers } from "../functions/getHeaders";
import { userId } from "../functions/getUserId";

interface Employee {
  id: number;
  full_name: string;
  email: string;
  points: number;
  // Add other properties as needed
}

function TaskCompletionChart(): JSX.Element {
  const [chart, setChart] = useState<Chart<"bar"> | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchTasksCompletedData = async () => {
      try {
        const res: AxiosResponse<{ employees: Employee[] }> =
          await axiosClient.get(`/firstFiveEmployees/${userId}`, { headers });

        const labels = res.data.employees.map((employee) => {
          if (employee.points !== 0) return employee.full_name;
        });
        const data = res.data.employees.map((employee) => {
          // Calculate the number of completed tasks based on points
          if (employee.points !== 0) {
            const tasksCompleted = Math.floor(employee.points / 10); // 1 point = 1 task completed within deadline
            return tasksCompleted;
          }
        });

        if (chartRef.current !== null) {
          const newChart: any = new Chart(chartRef.current, {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Tâches Accomplies",
                  data: data,
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Nombre de Tâches Accomplies",
                    font: {
                      size: 14,
                    },
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Employés",
                    font: {
                      size: 14,
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
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
      <h3>Tâches Accomplies par les Employés</h3>
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
