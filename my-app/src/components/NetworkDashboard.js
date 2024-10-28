import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NetworkDashboard = ({ isSimulating }) => { // Add isSimulating prop
  const [trafficData, setTrafficData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Node 1 Traffic',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Node 2 Traffic',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Node 3 Traffic',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        tension: 0.1
      },
      {
        label: 'Node 4 Traffic',
        data: [],
        borderColor: 'rgb(255, 206, 86)',
        tension: 0.1
      }
    ]
  });

  useEffect(() => {
    let interval;
    
    if (isSimulating) {
      interval = setInterval(() => {
        // Generate random traffic for each node
        const traffic1 = Math.floor(Math.random() * 100);
        const traffic2 = Math.floor(Math.random() * 100);
        const traffic3 = Math.floor(Math.random() * 100);
        const traffic4 = Math.floor(Math.random() * 100);

        const now = new Date();
        const timeLabel = now.toLocaleTimeString();

        setTrafficData(prevData => {
          const newLabels = [...prevData.labels, timeLabel];
          const newDatasets = prevData.datasets.map((dataset, index) => {
            const trafficValue = [traffic1, traffic2, traffic3, traffic4][index];
            return {
              ...dataset,
              data: [...dataset.data, trafficValue]
            };
          });

          // Keep only last 20 data points
          if (newLabels.length > 20) {
            newLabels.shift();
            newDatasets.forEach(dataset => dataset.data.shift());
          }

          return {
            labels: newLabels,
            datasets: newDatasets
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSimulating]); // Add isSimulating as dependency

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Network Traffic Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Network Topology Dashboard</h2>
      <Line data={trafficData} options={options} />
    </div>
  );
};

export default NetworkDashboard;