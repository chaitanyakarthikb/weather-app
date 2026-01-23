import React, { useEffect, useState } from 'react'
import './ChartBox.css'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useSelectedLocationContext } from '../store/SelectedLocationContext'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const ChartBox = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedChart, setSelectedChart] = useState('temperature');
  
  let selectedLocation = useSelectedLocationContext();
  let { latitude, longitude } = selectedLocation.selectedLocation || {};
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const formatDate = (date) => date.toISOString().split("T")[0];
  const startDate = formatDate(sevenDaysAgo);
  const endDate = formatDate(today);

  useEffect(() => {
    const fetchForecastData = async () => {
      console.log("============basva")
      if (!latitude || !longitude) return;
      try {
        let apiURL = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean,temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_speed_10m_max`;
        let apiResponse = await fetch(apiURL);
        let data = await apiResponse.json();
        console.log("=========forecast data", data);
        setChartData(data);
      } catch (error) {
        console.log("==========error", error);
      }
    };
    fetchForecastData();
  }, [startDate, endDate, selectedLocation]);

  const generateLabel = (labels) =>{
    return labels?.map((dateStr)=>{
      return new Date(dateStr).toLocaleDateString(undefined, { weekday: 'short' });
    })

  }

  // Combined Chart with 3 lines
  const data = {
    labels: generateLabel(chartData?.daily?.time),
    datasets: selectedChart === 'temperature' 
      ? [
          {
            label: 'Mean Temperature (°C)',
            data: chartData?.daily?.temperature_2m_mean,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            tension: 0.1,
          },
        ]
      : [
          {
            label: 'Wind Speed (m/s)',
            data: chartData?.daily?.wind_speed_10m_max,
            borderColor: 'rgb(255, 159, 64)',
            backgroundColor: 'rgba(255, 159, 64, 0.1)',
            tension: 0.1,
          },
        ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Temperature Chart',
      },
    },
  }

  return (
    <div className='chartbox'>
      <div className='buttons' style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
        className={selectedChart === 'temperature' ? 'active' : ''}
          onClick={() => setSelectedChart('temperature')}
        >
          Temperature
        </button>
        <button 
          className={selectedChart === 'wind' ? 'active' : ''}
          onClick={() => setSelectedChart('wind')}
        >
          Wind Speed
        </button>
      </div>
      <Line data={data} options={options} />
    </div>
  )
}

export default ChartBox
