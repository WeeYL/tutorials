import * as model from './model';

// CREATE EMPTY ARRAY

export function createEmptyJobInfo() {
    const emptyDict = {
        accountId: "",
        cliendId: "",
        dateDay: "",
        dateDayName: "",
        dateMonth: "",
        dateYear: "",
        end_date: "",
        jobId: "",
        jobType: "",
        otp: "",
        status: "",
        time: "",
        error_msg:""
    }
    return emptyDict
}
    
// GET LIST OF DATE FROM DB
export function getlistOfMonthsFromDB(firstMonth: number) {

    let listOfMonthsFromDB: string[] = []
    for (let i = 0; i < 12; i++) {
        let x: number = firstMonth + i
        x < 13 ? listOfMonthsFromDB.push(JSON.stringify(x)) : listOfMonthsFromDB.push(JSON.stringify(x - 12))
        x = 0 // reset
    }
    return listOfMonthsFromDB
}


// GET EARLY AND LATEST JOB FROM DB
export function getEarliestLastestJobFromDB(dbResult: any, jobTypeList: string[]) {
    var tempDateList: any = []
    jobTypeList.forEach(jt => {
        let lastestJob = dbResult['completed'][jt][dbResult['completed'][jt].length - 1]
        var tempDate: string = lastestJob['end_date']
        tempDateList.push({ "end_date": new Date(tempDate), "job": lastestJob })
    })
    var lastestFromDB = tempDateList.sort((a: any, b: any) => b.end_date - a.end_date)[0]

    jobTypeList.forEach(jt => {
        let earliestJob = dbResult['completed'][jt][0]
        var tempDate: string = earliestJob['end_date']
        tempDateList.push({ "end_date": new Date(tempDate), "job": earliestJob })
    })
    var earlistFromDB = tempDateList.sort((a: any, b: any) => b.end_date - a.end_date)[0]

    return { earliest: earlistFromDB, latest: lastestFromDB }
}

// GET PREV MONTH INDEX
export function getPrevMonthNumericVal(selectedMonth:number): string[] {
    selectedMonth = selectedMonth-1 // for zero index, eg Jan=0 
    var prevMonth: number | Date | string = new Date()
    prevMonth.setMonth(selectedMonth - 1); // set to prev month
    prevMonth = JSON.stringify(prevMonth.getMonth() + 1) // +1 to account for zero index

    return [prevMonth] // Add 1 to align with month numbering index
}


// GET COUNTS OF JOBTYPE
export function getJobTypeCountsForMonths(jobs: any, jobTypeList: string[]): model.JobTypeFailSuccessTotalList {
    // RETURN DICT OF OUTCOME COUNTS

    let result: any = {}
    jobTypeList.forEach(jobType => {
        result[jobType] = jobs[jobType].length
    });

    return result
}

// GET LIST OF POSSIBLE DATES AND KEYS FOR DATE

export function getListOfPossibleDateFromMonth(targetMonthsIndex: string[]) {

    var possibleDateList: string[] = []

    // GET LIST OF POSSIBLE DATES
    targetMonthsIndex.forEach(month => {
        possibleDateList.push(...Array.from(Array(31).keys()).map(x => (`${month}-${x + 1}`)))
    });
    return possibleDateList
}

export function createMultipleKeysDictionary(mainKeys: string[], subKeys: string[]) {
    // CREATING A DICTION OF MAIN KEYS AND THEIR SUB KEYS
    var dateDict: any = {}
    // CREATE DATE : KEY DICT
    mainKeys.forEach((d) => {
        dateDict[d] = []
        dateDict[d].push(subKeys)
        subKeys.forEach((k: string) => {
            dateDict[d][k] = []
        })
        delete dateDict[d][0]
    })
    return dateDict

}
// GET JOBINFO BY DATE
export function getDateJobsData(jobsArray: any, jobTypeList: string[], targetMonthsIndex: string[]) {

    var dateOfJob: string[] = []
    var dateDataInfo: any = {}
    const dateKeys = [...jobTypeList, "total",]

    // GET LIST OF POSSIBLE DATES  
    const possibleDateList = getListOfPossibleDateFromMonth(targetMonthsIndex)
    // CREATE INITITATE EMPTY DATE DICTIONARY
    const dateJobsInfoDict:Record <string, model.JobTypeJobInfoList> = createMultipleKeysDictionary(possibleDateList, jobTypeList)
    const dateCountsDict = createMultipleKeysDictionary(possibleDateList, dateKeys)
    // Record<string,model.JobTypesCount> 
    // PASS JOB INFO TO DATE DICTIONARY
    jobTypeList.forEach((jobType: any) => {
        jobsArray[jobType].forEach((job: any) => {
            var job_date = `${job['dateMonth']}-${job['dateDay']}`
            // PASS JOB INFO TO TOTAL AND INDIVIDUAL JOB 
            if (possibleDateList.includes(job_date)) {
                dateCountsDict[job_date]['total'].push(job)
                dateCountsDict[job_date][jobType].push(job)
                dateJobsInfoDict[job_date][jobType].push(job)
            }
        })
    })
    

    // CREATE JOB COUNT DICTIONARY
    Object.keys(dateCountsDict).forEach((date) => {
        // SET DATE 
        dateOfJob.push(date)
        // SET VALUE TO KEYS AND UPDATE DATELIST
        dateKeys.forEach(key => {
            dateCountsDict[date][key] = dateCountsDict[date][key].length
        })
    })

    // SET LIST DATEKEYS
    dateDataInfo['dateKeys'] = dateKeys
    dateDataInfo['dateOfJob'] = dateOfJob

    return { dateJobsInfoDict, dateCountsDict, dateDataInfo }
}

// GET PREV MONTH FAILED JOBTYPE
export function getJobTypeInfoForMonths(jobsArray: any, jobTypeList: string[], targetMonthsIndex: string[]) {
    let tempDict: any = {}
    jobTypeList.forEach(jobType => {
        // FOR JOBTYPE
        let statsList: model.JobInfo[] = []
        jobsArray[jobType].forEach((job: model.JobInfo, index: number) => {
            // RETRIEVE THE TARGET MONTH DATA
            targetMonthsIndex.forEach(month => {
                try {
                    if (job.dateMonth === month) {
                        statsList.push(jobsArray[jobType][index])
                    }
                } catch (error) {
                    return
                }
            });
        })
        tempDict[jobType] = statsList
    });
    return tempDict
}


// ADD DATE FORMAT VALUE TO JOBTYPE
export function addDataToJobType(jobTypeArray: model.JobInfo[], jobType: string, status: string): model.JobInfo[] {

    const weekday = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"]
    jobTypeArray.forEach(job => {
        try {
            job.dateYear = new Date(job.end_date!).toISOString().split('T')[0].substring(0, 4)
            let dateMonth = new Date(job.end_date!).toISOString().split('T')[0].substring(5, 7)
            let dateDay = new Date(job.end_date!).toISOString().split('T')[0].substring(8, 10)
            let time  = new Date(job.end_date!).toISOString().split('T')[1].substring(0,8);
            job.dateMonth = `${+dateMonth}` // REMOVES LEADING ZEROES EG, 01 TO 1
            job.dateDay = `${+dateDay}`
            job.dateDayName = weekday[new Date(job.end_date!).getDay()]
            job.time = time
        } catch (error) {
            return
        }
        job.jobType = jobType
        job.status = status
    });
    return jobTypeArray
}