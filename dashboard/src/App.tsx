import 'bootstrap/dist/css/bootstrap.min.css';
import { BarChart } from './components/Bar';
import { CheckBox } from './components/CheckBox';
import { CheckBoxContextProvider, DateOfJobContextProvider, DBResultContextProvider } from './components/context/JobContext';
import { DoughNut } from './components/DoughNut';
import { JobTable } from './components/JobTable';
import { MultiLineBar } from './components/MultiLineBar';
import { StackChart } from './components/Stack';
import * as helper from './helper';
import './style.css';

// DATA
var dbResult = require('./dbResult.json')
const jobTypeList: string[] = Object.keys(dbResult["completed"])
// ADD INFO TO JOB FORMAT
jobTypeList.forEach(jobType => {
  helper.addDataToJobType(dbResult['failures'][jobType], jobType, 'failures')
  helper.addDataToJobType(dbResult['completed'][jobType], jobType, 'completed')
});
// DATE
let earliestLastestJobFromDB = helper.getEarliestLastestJobFromDB(dbResult, jobTypeList)
var nowDate = new Date();
const today: string[] = [`${nowDate.getFullYear()}`, `${(nowDate.getMonth() + 1)}`, `${nowDate.getDate()}`];
const listOfMonthsFromDB: string[] = helper.getlistOfMonthsFromDB(+earliestLastestJobFromDB['earliest']['job']['dateMonth'])

export default function App() {
  return (
    <div className=''>
      <DateOfJobContextProvider latestJob={earliestLastestJobFromDB.latest.job}>
        <CheckBoxContextProvider latestMonth={earliestLastestJobFromDB.latest.job.dateMonth} >
          <DBResultContextProvider dbResult={dbResult} jobTypeList={jobTypeList} dbResultComplete={dbResult.completed} dbResultFailures={dbResult.failures}>
            <div className='dashboard-grid max-height'>
              <div className='dashboard' style={{backgroundColor:"transparent"}}>
                <h1 style={{textAlign:"left", }}>SMS Stats Overview</h1>
              </div>
              <div className='dashboard'>
                <DoughNut earliestLastestJobFromDB={earliestLastestJobFromDB} />
              </div>
              <div className='dashboard'>
                <CheckBox listOfMonthsFromDB={listOfMonthsFromDB} />
              </div>
              <div className='dashboard'>
                <BarChart outcomeLabel={['success', 'failure']} title="Latest 3 month Bar" />
                <StackChart outcomeLabel={['success', 'failure']} title="" />
              </div>
              <div className='dashboard'>
                <MultiLineBar title={"Jobs Completed Month Chart"} failureCompletedResult={dbResult.completed} jobTypeList={jobTypeList} />
                <JobTable DBDuration={listOfMonthsFromDB} failureCompletedResult={dbResult.completed} jobTypeList={jobTypeList} />
              </div>
              <div className='dashboard'>
                <MultiLineBar title={"Jobs Failures Month Chart"} failureCompletedResult={dbResult.failures} jobTypeList={jobTypeList} />
                <JobTable DBDuration={listOfMonthsFromDB} failureCompletedResult={dbResult.failures} jobTypeList={jobTypeList} />
              </div>
            </div>
          </DBResultContextProvider>
        </CheckBoxContextProvider>
      </DateOfJobContextProvider>
    </div >
  )
}

