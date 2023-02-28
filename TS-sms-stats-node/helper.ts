import * as model from './src/model'

var _ = require("lodash")




// RETURN A LIST OF UNIQUE OUTCOMES FOR THE SELECTED FIELD EG STATUS: FAILED, COMPLETED
export function listUniqueOutcomes(jobs:any, field:string) {
    // RETURN A LIST OF UNIQUE OUTCOMES FOR THE SELECTED FIELD
    var tempList:string[] = []
    let totalJobsCount = (Object.keys(jobs)).length
    for (let i = 0; i < totalJobsCount; i++) {
        var n = i.toString()
        tempList.push(jobs[n][field])
      }

    let uniqueOutcome = [...new Set(tempList)] 
    return uniqueOutcome
  }

// RETURN DICT OF FAILED JOBS    
export function getJobInfo(jobs:any, outcomes:string[], status:string) {
    // RETURN DICT OF FAILED JOBS    
    
    let numOfOutcomes = outcomes.length
    const result: any = {}
    // for each outcome, return the FAILED status
    for (let i = 0; i < numOfOutcomes; i++){
        var outcome = outcomes[i]
        var tempList=[]
        var arr = _.filter(
            jobs, function(job:any) {
                return job.type == outcome && job.status == status;
            }
        );
        // get the list of failed jobs, and skip if no failed job     
        var numOfFailedItem = arr.length
        if (numOfFailedItem == 0 ){ 
            continue
        }
        var tempList = []
        // extract specific data
        for (let i = 0; i < numOfFailedItem; i++){
            var basicJobInfo = {cliendId:arr[i].clientId, accountId:arr[i].accountId, jobId:arr[i].id, end_date:arr[i].ended, error_msg:arr[i].error_msg}
            // ONLY FOR TYPE OTP AND OTP_V2
            if(arr[i].type == "OTP" || arr[i].type == "OTP_V2")
            {
                tempList.push({...basicJobInfo,'otp':arr[i].otp})
            } else {
                tempList.push(basicJobInfo)
            }
        }
        // set to result dict
        result[outcome]=tempList
    }
    return result
}

// RETURN DICT OF OUTCOME COUNTS
export function getFieldStatusOutcomeCount(jobs:any, outcomes:string[]) {

    let numOfOutcomes = outcomes.length
    const result: any = {}
    // for each outcome, 
    for (let i = 0; i < numOfOutcomes; i++){
        var outcome = outcomes[i]
    // return failed array count
        var failedArray = _.filter(
            jobs, function(job:any) {
                return job.type == outcome && job.status == 'FAILED';
            }
        );
    // return passed array count
        var passedArray = _.filter(
            jobs, function(job:any) {
                return job.type == outcome && job.status == 'COMPLETED';
            }
        );

    // total count
    const total = passedArray.length+failedArray.length
    // compiled to dict
        result[outcome] = {success: passedArray.length, failure: failedArray.length, total:total}
    }
    return result
}

// ADD MONTHINDEX VALUE TO JOBTYPE
export function addMonthIndexToJobType(jobTypeArray:model.StatsFormat[]):model.StatsFormat[]{
    jobTypeArray.forEach(job => {
        try {
            job.monthIndex=getMonthIndexFromJobEndDate(job.end_date)
        } catch (error) {
            return
        }
    });
    return jobTypeArray
}

// GET PREV MONTH INDEX
export function getPrevMonthIndex(i:number = 1):string{
    let currentMonth: number | Date = new Date()
    var prevMonth: number | Date | string= new Date()    
    prevMonth.setMonth(currentMonth.getMonth() - i);
    prevMonth = JSON.stringify(prevMonth.getMonth() + 1) // +1 to account for zero index
    prevMonth.padStart(2,'0') // add leading zero
    return prevMonth.padStart(2,'0') // Add 1 to align with month numbering index
}

// GET MONTH INDEX FROM DATESTRING 
export function getMonthIndexFromJobEndDate(d:string):string {
    let myDate = new Date(d)
    return myDate.toISOString().split('T')[0].substring(5, 7)
}


// GET PREV MONTH FAILED JOBTYPE
export function getJobsInfoForMonth ( jobsArray:any,jobType:string, targetMonthsIndex:string[]){
    let statsList: model.StatsFormat[] = []
    
    // FOR JOBTYPE
        jobsArray[jobType].map((job:model.StatsFormat,index:number)=> {
            // RETRIEVE THE TARGET MONTH DATA
            targetMonthsIndex.forEach(month => {
                try {
                    if (job.monthIndex == month) {
                        statsList.push(jobsArray[jobType][index])
                    }
                } catch (error) {
                    return
                }
            });
        })
    return statsList
}
