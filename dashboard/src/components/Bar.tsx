import * as ChartJS from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { JobTypeColors } from '../JobEnums';
import * as helper from '../helper';
import * as model from '../model';
import { useContext } from 'react';
import { FontSize, NumToMonth } from '../JobEnums';
import { DateOfJobContext, DBResultContext } from './context/JobContext';
ChartJS.Chart.register(ChartJS.LineElement, ChartJS.PointElement, ChartJS.CategoryScale, ChartJS.LinearScale, ChartJS.BarElement, ChartJS.Title, ChartJS.Tooltip, ChartJS.Legend,);

// **************
// FUNCTIONS
// **************

var barTable: any = {}

function getDataForChart(outcomeLabel: string[], jobTypeList: any, successJob: any, failedJob: any) {
  var datasets = []
  for (let index = 0; index < jobTypeList.length; index++) {
    // GET JOBTYPE
    var jobType: string = jobTypeList[index];
    // GET FAILURE AND SUCCESS
    let data = [successJob[jobType], failedJob[jobType]]
    // GET PERCENTAGE
    var total = successJob[jobType] + failedJob[jobType]
    var perc = 100 * (successJob[jobType] / total)
    perc = Math.round((perc + Number.EPSILON) * 100) / 100;
    barTable[jobType] = { 'jt': jobType, 'perc': `${perc}% (${successJob[jobType]}/${total})` }
    // FOR EACH DATASET
    var tempDict = {
      label: jobType,
      data: data,
      backgroundColor: JobTypeColors[jobType],
      maxBarThickness: 30
    }
    datasets.push(tempDict)
  }
  // CONSOLIDATE THE DATA FOR GRAPH
  const dataForChart: model.DataForGraphComponent = {
    labels: outcomeLabel,
    datasets: datasets
  }

  return { dataForChart, barTable }
}

// **************
// BAR CHART
// **************
export const BarChart = (props: { outcomeLabel: string[], title: string }) => {

  let dbResultContext = useContext(DBResultContext)
  let dateOfJobContext = useContext(DateOfJobContext)

  // GET PAST 3 MONTH
  let pastMonthsCount = 2
  var monthList: string[] = [dateOfJobContext.latestMonth]
  for (let index = 0; index < pastMonthsCount; index++) {
    var curMonth: number = +monthList[index]
    monthList.push(...helper.getPrevMonthNumericVal(curMonth))
  }

  var resultC: any = [];
  resultC = helper.getJobTypeInfoForMonths(dbResultContext.dbResultComplete, dbResultContext.jobTypeList, monthList)
  resultC = helper.getJobTypeCountsForMonths(resultC, dbResultContext.jobTypeList)

  var resultF: any = [];
  resultF = helper.getJobTypeInfoForMonths(dbResultContext.dbResultFailures, dbResultContext.jobTypeList, monthList)
  resultF = helper.getJobTypeCountsForMonths(resultF, dbResultContext.jobTypeList)


  const { dataForChart, barTable } = getDataForChart(props.outcomeLabel, dbResultContext.jobTypeList, resultC, resultF)

  var bar_options: any

  bar_options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: props.title,
        font: {
          size: FontSize['h5pt']
        }
      },
    },
  };


  // DISPLAY DATE
  var latestDateDisplay = `${NumToMonth[monthList[0]]}`
  var earlistDateDisplay = `${NumToMonth[monthList[monthList.length - 1]]}`
  return (<>
  <div style={{textAlign:"left"}}>
    <h4 >Latest 3 months</h4>
    <p>{earlistDateDisplay} to {latestDateDisplay}</p>
  </div>
    <Bar options={bar_options} data={dataForChart} />
  </>
  )
}