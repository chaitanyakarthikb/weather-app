import React from 'react'
import './AirAndChartBox.css'
import AirQuality from './AirQuality'
import ChartBox from './ChartBox'
const AirAndChartBox = () => {
  return (
    <div className='AirAndChartBox'>
        <AirQuality/>
        <ChartBox/>
    </div>
  )
}

export default AirAndChartBox
