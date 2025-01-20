import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface User {
  id: string;
  name: string;
  total_downloads: number;
  total_logins: number;
}

interface UserChartProps {
  users: User[];
}

export const UserChart: React.FC<UserChartProps> = ({ users }) => {
  const barChartData = {
    labels: users.map((user) => user.name),
    datasets: [
      {
        label: "Total Downloads",
        data: users.map((user) => user.total_downloads),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Logins",
        data: users.map((user) => user.total_logins),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "User Metrics: Downloads and Logins",
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Overall Metrics</h2>
      <Bar data={barChartData} options={barChartOptions} />
    </div>
  );
};
