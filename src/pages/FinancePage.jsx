/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Chart, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinancePage = () => {
  const [viewType, setViewType] = useState("monthly"); // 'monthly' or 'yearly'
  const [investment, setInvestment] = useState(0);
  const [income, setIncome] = useState(0);
  const [profit, setProfit] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Retrieve userData from local storage
    const userData = JSON.parse(localStorage.getItem("userData")) || [];

    // Calculate investment (sum of teachers' salary) and income (sum of students' fees)
    const totalInvestment = userData
      .filter((user) => user.profession === "Teacher")
      .reduce(
        (acc, teacher) =>
          acc + (teacher.salary ? parseFloat(teacher.salary) : 0),
        0
      ); // Ensure salary is a number

    const totalIncome = userData
      .filter((user) => user.profession === "Student")
      .reduce((acc, student) => acc + parseFloat(student.feesPaid || 0), 0); // Ensure feesPaid is a number

    setInvestment(totalInvestment);
    setIncome(totalIncome);
    setProfit(totalIncome - totalInvestment);

    // Set chart data based on the selected view type
    if (viewType === "monthly") {
      setChartData(generateMonthlyData(userData));
    } else {
      setChartData(generateYearlyData(userData));
    }
  }, [viewType]);

  const generateMonthlyData = (userData) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentYear = new Date().getFullYear();
    const monthlyIncome = Array(12).fill(0);
    const monthlyInvestment = Array(12).fill(0);

    userData.forEach((user) => {
      const userDate = new Date(user.enrolledDate);
      const month = userDate.getMonth();
      const year = userDate.getFullYear();

      if (year === currentYear) {
        if (user.profession === "Teacher") {
          monthlyInvestment[month] += parseFloat(user.salary || 0); // Ensure salary is a number
        } else if (user.profession === "Student") {
          monthlyIncome[month] += parseFloat(user.feesPaid || 0); // Ensure feesPaid is a number
        }
      }
    });

    const monthlyProfit = monthlyIncome.map(
      (inc, idx) => inc - monthlyInvestment[idx]
    );

    return {
      labels: months,
      datasets: [
        {
          label: "Income",
          data: monthlyIncome,
          borderColor: "#71717a",
          backgroundColor: "#71717a",
        },
        {
          label: "Investment",
          data: monthlyInvestment,
          borderColor: "#f87171",
          fill: false,
          backgroundColor: "#f87171",
        },
        {
          label: "Profit",
          data: monthlyProfit,
          borderColor: "#a3e635",
          fill: false,
          backgroundColor: "#a3e635",
        },
      ],
    };
  };

  const generateYearlyData = (userData) => {
    const yearlyIncome = {};
    const yearlyInvestment = {};

    userData.forEach((user) => {
      const year = new Date(user.enrolledDate).getFullYear();

      if (user.profession === "Teacher") {
        yearlyInvestment[year] =
          (yearlyInvestment[year] || 0) + parseFloat(user.salary || 0); // Ensure salary is a number
      } else if (user.profession === "Student") {
        yearlyIncome[year] =
          (yearlyIncome[year] || 0) + parseFloat(user.feesPaid || 0); // Ensure feesPaid is a number
      }
    });

    const years = Object.keys(yearlyIncome);
    const yearlyProfit = years.map(
      (year) => yearlyIncome[year] - yearlyInvestment[year]
    );

    return {
      labels: years,
      datasets: [
        {
          label: "Income",
          data: Object.values(yearlyIncome),
          borderColor: "#fcd34d",
          backgroundColor: "#fcd34d",
        },
        {
          label: "Investment",
          data: Object.values(yearlyInvestment),
          borderColor: "#f87171",
          fill: false,
          backgroundColor: "#f87171",
        },
        {
          label: "Profit",
          data: yearlyProfit,
          borderColor: "#a3e635",
          fill: false,
          backgroundColor: "#a3e635",
        },
      ],
    };
  };

  return (
    <div className="w-full p-5">
      <h2 className="text-2xl font-bold mb-5 text-slate-700">
        Finance Overview
      </h2>

      <div className="mb-5">
        <button
          className={`py-2 px-4 mr-3 ${
            viewType === "monthly"
              ? "bg-slate-500 text-white font-semibold"
              : "bg-gray-200"
          }`}
          onClick={() => setViewType("monthly")}
        >
          Monthly View
        </button>
        <button
          className={`py-2 px-4 ${
            viewType === "yearly"
              ? "bg-slate-500 text-white font-semibold"
              : "bg-gray-200"
          }`}
          onClick={() => setViewType("yearly")}
        >
          Yearly View
        </button>
      </div>

      <div className="mb-5 flex flex-col gap-y-4">
        <h3 className="text-slate-700 font-bold">
          Investment (Total Teacher Salary): ₹
          <span className="font-semibold text-slate-700 font-nunito">
            {investment}
          </span>
        </h3>
        <h3 className="text-slate-700 font-bold">
          Income (Total Student Fees): ₹
          <span className="font-semibold text-slate-700 font-nunito">
            {income}
          </span>
        </h3>
        <h3 className="text-slate-700 font-bold">
          Profit: ₹
          <span className="font-semibold text-slate-700 font-nunito">
            {profit}
          </span>
        </h3>
      </div>

      {/* Render the chart */}
      <div>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default FinancePage;
