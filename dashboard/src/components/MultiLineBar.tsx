import * as ChartJS from 'chart.js';
import { useContext, useRef } from 'react';
import { Chart, getElementsAtEvent } from 'react-chartjs-2';
import * as helper from '../helper';
import { FontSize, JobTypeColors } from '../JobEnums';
import * as model from '../model';
import { CheckBoxContext, DateOfJobContext } from './context/JobContext';
ChartJS.Chart.register(ChartJS.LineElement, ChartJS.PointElement, ChartJS.CategoryScale, ChartJS.LinearScale, ChartJS.BarElement, ChartJS.Title, ChartJS.Tooltip, ChartJS.Legend,);

export const MultiLineBar = (props: { title: string, failureCompletedResult: any, jobTypeList: string[] }) => {
    let checkBoxContext = useContext(CheckBoxContext)
    let dateOfJobContext = useContext(DateOfJobContext)
    var lineMonthPeriod: string[] = []

    // TODO ON STARTUP
    checkBoxContext.selectedMonths?.month == null ? lineMonthPeriod = [dateOfJobContext.latestMonth] : lineMonthPeriod = checkBoxContext.selectedMonths?.month
    // DATASET
    let jobCompletedForLineGraph: model.JobTypeJobInfoList = helper.getJobTypeInfoForMonths(props.failureCompletedResult, props.jobTypeList, lineMonthPeriod)
    const { dateJobsInfoDict, dateCountsDict, dateDataInfo } = helper.getDateJobsData(jobCompletedForLineGraph, props.jobTypeList, lineMonthPeriod)

    var test = "2023-02-22T12:49:15.581Z";
    // test = test.length
    console.log(test.slice(11,19))
    // **********
    // LINE
    // **********
    var lineDatasets: any = []
    // GET ONLY JOBTYPE EXCEPT "TOTAL"
    for (let index = 0; index < dateDataInfo['dateKeys'].length - 1; index++) {
        // GET JOBTYPE
        var dateKey: string = dateDataInfo['dateKeys'][index];
        // GET DATA FOR EACH JOBTYPE
        let data = dateDataInfo['dateOfJob'].map((d: any) => dateCountsDict[d][dateKey])
        // FOR EACH DATASET
        var lineDict = {
            label: dateKey,
            type: 'line' as const,
            data: data,
            tension: 0.2,
            backgroundColor: JobTypeColors[dateKey],
            radius: "6",
            hitRadius: 2,
            fontStyle: "bold",

        }
        lineDatasets.push(lineDict)
    }
    // **********
    // BAR
    // **********
    var barData: any = []
    barData = dateDataInfo['dateOfJob'].map((d: any) => dateCountsDict[d]['total'])
    var barDataSet = {
        type: 'bar' as const,
        label: 'TOTAL',
        backgroundColor: JobTypeColors.BAR_TOTAL,
        data: barData,
        borderColor: 'white',
        borderWidth: 2,
        barPercentage: 1,
    }

    const data = {
        labels: dateDataInfo['dateOfJob'],
        datasets: [...lineDatasets, barDataSet]
    }
    // **********
    // OPTIONS
    // **********
    const options = {

        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    padding: 24,
                    font: {
                        size: +FontSize['h5pt'],
                        weight: "bold",

                    }
                },
            },
        },
        point: {
            radius: "10"
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90,
                    font: {
                        size: +FontSize['h6pt']
                    }
                }
            }
        }
    }

    // **********
    // ONCLICK EVENT
    // **********
    const lineRef = useRef(null!)

    const onClick = (event: any) => {

        if (getElementsAtEvent(lineRef.current, event).length > 0) {
            var dataPointIndex = getElementsAtEvent(lineRef.current, event)
            // GET DATE OF JOB
            var selectedDate = dateDataInfo['dateOfJob'][dataPointIndex[0]['index']]
            dateOfJobContext.setDateOfJob(selectedDate)
            // SET DATE OF JOB
            selectedDate = selectedDate.split('-');
            // SET COUNT TO THE SELECTED DATE
            var jobCountList: number[] = []
            // TRY CATCH TO AVOID BARCHART
            dataPointIndex.map(d => {
                try {
                    jobCountList.push(lineDatasets[d.datasetIndex]['data'][d.index])
                } catch (error) { }
            })
        }
    }
    return (
        <>
            <div>
                <h4>
                    {props.title}
                </h4>
            </div>
            <Chart options={options} type="bar" data={data} ref={lineRef} onClick={onClick} />
        </>
    )
}