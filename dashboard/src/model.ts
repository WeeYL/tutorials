export interface DB{
    [res:string]:{
        total_jobs?:string
        results?:{[jobType:string]:JobTypeFailSuccessTotalList}
        failures?: { [jobType:string]:JobInfo[]}
        completed?: { [jobType:string]:JobInfo[]}
    }
}

export interface JobInfo {
    cliendId?: string,
    accountId?: string,
    jobId?: string,
    end_date?: string,
    error_msg?: string,
    dateYear?: string,
    dateMonth?: number|string,
    dateDay?: string,
    dateDayName?: string,
    status?: string,
    otp?: string,
    jobType?: string,
    time?: string
}

export interface JobTypeJobInfoList  {
    [jobType:string]:JobInfo[]
    
}

export interface JobTypeFailSuccessTotalList {
    [jobType: string]: {
        success: number,
        failure: number,
        total: number
    }
}

export interface JobTypesCount {
    [date:string]:{
        MSG: number, 
        OTP_V2: number, 
        OTP: number, 
        total: number
    }[]
}

export interface DatasetForGraph{
        label: string;
        data: number[] | number;
        backgroundColor?: string;
        hoverBorderDash?: number[]
}

export interface DataForGraphComponent {
    labels: string[];
    datasets: DatasetForGraph[];
}



