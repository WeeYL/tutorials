import * as helper from '../helper'
var _ = require("lodash")
var DB = require('./db.json'); 
var fs = require('fs');
let jobResult = DB.jobs
let totalJobsCount = (Object.keys(jobResult)).length

var fieldStatusOutcomes = helper.listUniqueOutcomes(jobResult,'status')
var fieldTypeOutcomes = helper.listUniqueOutcomes(jobResult,'type')

// END RESULT
// GET RESULT
let formattedStatJSON = {
    total_jobs: totalJobsCount,
    results: helper.getFieldStatusOutcomeCount(jobResult,fieldTypeOutcomes),
    failures:helper.getJobInfo(jobResult,fieldTypeOutcomes,'FAILED'),
    completed:helper.getJobInfo(jobResult,fieldTypeOutcomes,'COMPLETED'),
};

interface StatsFormat {
    jobId: string,
    end_date: string,
    error_msg?: string
}



// GENERATE JSON FILE
var myResult = JSON.stringify(formattedStatJSON);




// WRITE
fs.writeFile("myResult.json", myResult, function() {
    console.log('success');
});