import * as model from './model'
import * as helper from '../helper'

var statsJSON = require('./statsJSON.json'); 
var failedJobs = statsJSON['data']['failures']
const prevMonth = helper.getPrevMonthIndex()
const failedJobTypeList = Object.keys(statsJSON['data']['failures'])

console.log(failedJobs)



// ADD MONTHINDEX FORMAT
failedJobTypeList.forEach(jobType => {
    helper.addMonthIndexToJobType(failedJobs[jobType])
});


// GET PREVIOUS MONTH DATA
let prevMonthData:any = {}
failedJobTypeList.forEach(jobType => {
    prevMonthData[jobType] = helper.getJobsInfoForMonth(failedJobs,jobType,[prevMonth])
});


// GET PAST MONTHS DATA
var monthRng:string[]=[];
for (let index = 1; index <= 2; index++) {
    monthRng.push(helper.getPrevMonthIndex(index))
}
console.log(monthRng)
let pastMonthsData:any = {}
failedJobTypeList.forEach(jobType => {
    pastMonthsData[jobType] = helper.getJobsInfoForMonth(failedJobs,jobType,monthRng)
});

// GET DURATION
let started = new Date('2022-12-14T03:15:43.086Z')
let ended = new Date ('2022-12-14T05:30:15.712Z')

// console.log(prevMonthData)
console.log(pastMonthsData)