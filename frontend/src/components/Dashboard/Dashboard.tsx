
import { Button } from "../ui/button";
import { Toast } from "../toaster/toast";

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Cards - Customize as per your needs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold">Game 1</h2>
          <p className="text-gray-600 dark:text-gray-400">Prizes: $100</p>
          <p className="text-gray-600 dark:text-gray-400">Rules: Follow the instructions</p>
          <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1">
            Play Now
          </button>
        </div>
        {/* Repeat for more cards */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold">Game 2</h2>
          <p className="text-gray-600 dark:text-gray-400">Prizes: $200</p>
          <p className="text-gray-600 dark:text-gray-400">Rules: Follow the instructions</p>
          <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1">
            Play Now
          </button>
        </div>
        {/* Add more cards as needed */}
      </div>
    </div>
  )
  
};

export default Dashboard;
