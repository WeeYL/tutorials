import * as ChartJS from 'chart.js';
import { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import * as helper from '../helper';
import { FontSize, NumToMonth } from '../JobEnums';
import * as model from '../model';
import { DateOfJobContext } from './context/JobContext';
import { Pagination } from './Pagination';
ChartJS.Chart.register(ChartJS.LineElement, ChartJS.PointElement, ChartJS.CategoryScale, ChartJS.LinearScale, ChartJS.BarElement, ChartJS.Title, ChartJS.Tooltip, ChartJS.Legend,);


export const JobTable = (props: { failureCompletedResult: any, jobTypeList: string[], DBDuration: string[] }) => {

  // CONTEXT
  const dateOfJobContext = useContext(DateOfJobContext)
  // ONLOAD
  let selectedDate = dateOfJobContext?.dateOfJob
  let defaultDate = dateOfJobContext.latestDate
  dateOfJobContext?.dateOfJob == null ? selectedDate = defaultDate : selectedDate = dateOfJobContext?.dateOfJob
  let selectedDateFormat = `${NumToMonth[selectedDate.split('-')[0]]} ${selectedDate.split('-')[1]}`
  let jobCompletedForLineGraph: model.JobTypeJobInfoList = helper.getJobTypeInfoForMonths(props.failureCompletedResult, props.jobTypeList, props.DBDuration)
  const { dateJobsInfoDict, dateCountsDict, dateDataInfo } = helper.getDateJobsData(jobCompletedForLineGraph, props.jobTypeList, props.DBDuration)
  
  // RESET PAGINATED PAGE WITH NEW DATE SELECTION
  
  // TABLE LIST OF JOB FOR THE SELECTED JOB DATE   
  var selectedJobs: model.JobTypeJobInfoList = {}
  selectedJobs = ({ ...dateJobsInfoDict[selectedDate!] })
  var tempJobTableList: any = []
  
  Object.keys(selectedJobs).forEach(d => {
    tempJobTableList.push(selectedJobs[d])
  })
  
  let tableData: model.JobInfo[] = tempJobTableList.flat()
  
  // PAGINATION DATA
  const [currentPage, setCurrentPage] = useState(1);
  const nOfJobs:number = tableData.length
  var recordsPerPage:number
  tableData.length >100 ? recordsPerPage = 20 : recordsPerPage = 8
  var nPages:number = 0
  nOfJobs < 1 ? nPages=1 : nPages = Math.ceil(nOfJobs/recordsPerPage)
  
  useEffect(()=>{
    setCurrentPage(1)
  },[dateOfJobContext.dateOfJob])
  

  var nPagesList:number[]=[]
  if (nOfJobs < 1) {
    nPagesList = [1]
  } else {
    for (let index = 1; index < nPages+1; index++) {
      nPagesList.push(index)
    }
  }
  var nRowsPerPageList:number[] =[]
  for (let index = 0; index < recordsPerPage; index++) {
    nRowsPerPageList.push(index)
  }
  
  // TABLECONTENT FOR EACH PAGE
  var tempTableDataList:model.JobInfo[] = tableData
  var tableDataCount:number | null = null
  tableData.length < 1 ? tableDataCount = 0 : tableDataCount = tableData.length
  
  for (let index = 0; index < nPages*recordsPerPage-tableDataCount; index++) {
    tempTableDataList.push(helper.createEmptyJobInfo())
  }
  
  const tableContentList:any = []
  for (let index = 0; index < tempTableDataList.length; index +=recordsPerPage) {
    tableContentList.push(tableData.slice(index,index+recordsPerPage))
  }
  console.log(tableContentList)
  return (
    <div>
      <h6 style={{ textAlign: 'left' }}>
        {selectedDateFormat}
      </h6>

      <Pagination nPagesList={nPagesList} nOfJobs={nOfJobs} nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th><h6>nr</h6></th>

              <th><h6>jobId ({dateCountsDict[selectedDate!]['total'] === "" ? "0" : dateCountsDict[selectedDate!]['total']})</h6></th>
              <th><h6>jobType</h6></th>
              <th><h6>status</h6></th>
              <th><h6>OTP</h6></th>
              <th><h6>error</h6></th>
              <th><h6>time</h6></th>
              <th><h6>cliendId</h6></th>
              <th><h6>accountId</h6></th>
            </tr>
          </thead>
          <tbody>
            
            {nRowsPerPageList.map(r => {
                
              return (
                <tr key={r}>
                  
                  <td style={{ fontSize: `${FontSize['h6px']}` }}>{r=r+1}</td>
                  <td style={{ textAlign: "left", fontSize: `${FontSize['h6px']}` }}>{tableContentList?.[currentPage-1]?.[r-1].jobId}</td>
                  <td style={{ fontSize: `${FontSize['h6px']}` }}>{tableContentList?.[currentPage-1]?.[r-1].jobType}</td>
                  <td style={{ fontSize: `${FontSize['h6px']}` }}>{tableContentList?.[currentPage-1]?.[r-1].status}</td>
                  <td style={{ fontSize: `${FontSize['h6px']}` }}>{tableContentList?.[currentPage-1]?.[r-1].otp}</td>
                  <td style={{ textAlign: "left", fontSize: `${FontSize['h6px']}` }}>{tableContentList?.[currentPage-1]?.[r-1].error_msg}</td>
                  <td style={{ fontSize: `${FontSize['h6px']}` }}>{tableContentList?.[currentPage-1]?.[r-1].end_date.slice(11,16)}</td>
                  <td style={{ fontSize: `${FontSize['h6px']}` }}>{tableContentList?.[currentPage-1]?.[r-1].cliendId}</td>
                  <td style={{ fontSize: `${FontSize['h6px']}` }}>{tableContentList?.[currentPage-1]?.[r-1].accountId}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Pagination>
    </div>
  )
}

