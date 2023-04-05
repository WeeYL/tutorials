import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import * as helper from '../helper';
import * as model from '../model';
import { DateOfJobContext, DBResultContext } from './context/JobContext';
import { NumToMonth } from '../JobEnums';

import { FontSize, StatusColorCode } from '../JobEnums';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughNut = (props: { earliestLastestJobFromDB: any }) => {

  // CONTEXT
  let dbResultContext = useContext(DBResultContext)
  let dateOfJobContext=useContext(DateOfJobContext)

  // GET LAST 30 DAYS
  let prevMonthJob = helper.getPrevMonthNumericVal(+props.earliestLastestJobFromDB.latest['job']['dateMonth'])
  let latestMonthJob = props.earliestLastestJobFromDB.latest['job']['dateMonth']
  let latestDayJob = props.earliestLastestJobFromDB.latest['job']['dateDay']
  let lastThirtyDaysDateList: string[] = []
  var dayB = 1
  for (let index = 1; index <= 31; index++) {
    var dayA: number = +latestDayJob
    dayA = dayA + index
    if (dayA <= 31) {
      lastThirtyDaysDateList.push(`${prevMonthJob}-${dayA}`)
    } else {
      lastThirtyDaysDateList.push(`${latestMonthJob}-${dayB++}`)
    }
  }

  // DATASETS
  let jobsCompletedData: model.JobTypeJobInfoList = helper.getJobTypeInfoForMonths(dbResultContext.dbResultComplete, dbResultContext.jobTypeList, [prevMonthJob, latestMonthJob])
  let jobsFailuresData: model.JobTypeJobInfoList = helper.getJobTypeInfoForMonths(dbResultContext.dbResultFailures, dbResultContext.jobTypeList, [prevMonthJob, latestMonthJob])

  var { dateCountsDict: dateCountDictC } = helper.getDateJobsData(jobsCompletedData, dbResultContext.jobTypeList, [prevMonthJob, latestMonthJob])
  var { dateCountsDict: dateCountDictF } = helper.getDateJobsData(jobsFailuresData, dbResultContext.jobTypeList, [prevMonthJob, latestMonthJob])


  // CREATE DICTIONARY
  let result = helper.createMultipleKeysDictionary(['completed', 'failures', 'percentage'], dbResultContext.jobTypeList)
  // RESULT
  lastThirtyDaysDateList.forEach(d => {
    dbResultContext.jobTypeList.forEach(jt => {
      var count = +dateCountDictC[d][jt]
      result['completed'][jt] = +result['completed'][jt] + count
    });
  })
  lastThirtyDaysDateList.forEach(d => {
    dbResultContext.jobTypeList.forEach(jt => {
      var count = +dateCountDictF[d][jt]
      result['failures'][jt] = +result['failures'][jt] + count
    });
  })
  lastThirtyDaysDateList.forEach(d => {
    dbResultContext.jobTypeList.forEach(jt => {
      var count = +dateCountDictF[d][jt]
      var perc = 100 * (result['completed'][jt] / (result['completed'][jt] + result['failures'][jt]))
      result['percentage'][jt] = Math.round((perc + Number.EPSILON) * 100) / 100;
    });
  })

  // VISUAL DATA
  var myDatasets = []
  for (let index = 0; index < dbResultContext.jobTypeList.length; index++) {
    // GET JOBTYPE
    var jobType: string = dbResultContext.jobTypeList[index];
    // CHECK FOR NAN AND SET DATASETS
    var backgroundColor: string[]
    var data: string[]
    var labels: string[]
    if (result['percentage'][jobType] > 0) {
      backgroundColor = [StatusColorCode.SUCCESS_GREEN, StatusColorCode.FAILRES_RED]
      data = [result['completed'][jobType], result['failures'][jobType]]
      labels = ['completed', 'failures']

    } else {
      backgroundColor = [StatusColorCode.NAN_GREY, StatusColorCode.NAN_GREY]
      data = ['1', '0']
      labels = ['', '']
    }



    // FOR EACH DATASET
    let cutoff = 80
    var tempDict = {
      labels: labels,
      datasets: [
        {
          label: jobType,
          data: data,
          backgroundColor: backgroundColor,
          cutout: cutoff,
          radius: `${cutoff + 20}`,
        }
      ]
    }
    myDatasets.push(tempDict)
  }

  // DRAW TEXT IN CENTER
  var tempTextDict: any = {}
  dbResultContext.jobTypeList.map(jt => {
    var perc: number | string = result['percentage'][jt]
    perc > 0 ? perc = `${perc}%` : perc = "No Data"
    tempTextDict[jt] = {
      beforeDraw(chart: ChartJS) {
        const { ctx, data } = chart
        ctx.save()
        ctx.textAlign = 'center'
        ctx.font = `bolder ${FontSize['h3px']} san-setif`
        ctx.fillStyle = 'red'
        ctx.fillText(`${perc}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
      }
    }
  }
  )

  const optionsList: any = {}
  dbResultContext.jobTypeList.forEach(jt => {
    optionsList[jt] = {
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            font: {
              size: FontSize['h5pt']
            }
          }
        },
        title: {
          display: true,
          position: 'bottom' as const,
          text: jt,
          font: {
            size: FontSize['h5pt']
          }
        },
      },
    }
  })

  // DISPLAY DATE
  var earlistDateDisplay=`${NumToMonth[lastThirtyDaysDateList[0].split('-')[0]]} ${lastThirtyDaysDateList[0].split('-')[1]}`
  var latestDateDisplay=`${NumToMonth[lastThirtyDaysDateList[lastThirtyDaysDateList.length-1].split('-')[0]]} ${lastThirtyDaysDateList[lastThirtyDaysDateList.length-1].split('-')[1]}`

  return (
    <>
      <div>
        <h4 style={{ textAlign: "left" }}>Past 30 Days</h4>
        <p style={{ textAlign: "left" }}>{earlistDateDisplay} to {latestDateDisplay}</p>
      </div>

      <div style={{ display: 'flex', padding: "0px" }}>
        {myDatasets.map((d: any) => {
          var jobTypeLabel = d['datasets'][0]['label']
          return (
            <div className='d-inline' key={jobTypeLabel} >
              <Doughnut data={d} plugins={[tempTextDict[jobTypeLabel]]} options={optionsList[jobTypeLabel]} />
            </div>
          )
        })}
      </div>
    </>
  )
}

