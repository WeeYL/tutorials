import React from 'react';
import './App.css';
import * as graph from './graph'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
  );
  
  
  
  // GENERATE DATA
  const labels = ['success', 'failures'];
  interface myDict {
    label: string
    data:number[]
    backgroundColor:string
  }
  const myData = require('./myResult.json')
  const myResult = myData['data']
  const obj = (Object.keys(myResult['results']))
  var tempList = []
  var dict:myDict
  for (let index = 0; index < obj.length; index++) {
    const element = obj[index];
    dict = {
      "label":element,
      "data":[myResult['results'][element]["success"],myResult['results'][element]["failure"]],
      'backgroundColor': `rgba(${255/(1+index)}, ${30*(1+index)}, ${30*(1+index)}, 0.5)`,
    } 
    tempList.push(dict)
  }
    
  // EXPORT DATA FOR VISUALIZATION
  export const data = {
    labels,
    datasets: tempList
  };
  
  export default function App() {
    return <Bar options={graph.bar_options} data={data} />;
}
