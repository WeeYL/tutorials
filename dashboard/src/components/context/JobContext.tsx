import React, { createContext, useState } from 'react'



// ******************************

type DateOfJobContextProviderProps = {
    children: React.ReactNode
    latestJob?: any
}

type DateOfJobContextType = {
    dateOfJob: string | null
    setDateOfJob: React.Dispatch<React.SetStateAction<string | null>>
    latestMonth:string
    latestDay:string
    latestDate:string
}
// ******************************

export const DateOfJobContext = createContext({} as DateOfJobContextType ) // export const DateOfJobContext = createContext<DateOfJobContextType | null>(null)
export const DateOfJobContextProvider = ({ children, latestJob}: DateOfJobContextProviderProps ) => {
    const [dateOfJob, setDateOfJob] = useState<string | null>(null)
    let latestMonth:string = `${latestJob['dateMonth']}`
    let latestDay:string = `${latestJob['dateDay']}`
    let latestDate:string = `${latestJob['dateMonth']}-${latestJob['dateDay']}`
    return (
        <DateOfJobContext.Provider value={{ dateOfJob, setDateOfJob, latestMonth, latestDay, latestDate}}>
            {children}
        </DateOfJobContext.Provider>
    )
}

// ******************************

type MonthOfJob = {
    month: string[]
}

type CheckBoxContextType = {
    selectedMonths: MonthOfJob | null
    setSelectedMonths: React.Dispatch<React.SetStateAction<MonthOfJob | null>>
}
type CheckBoxContextProviderProps = {
    latestMonth:string
    children: React.ReactNode
}
export const CheckBoxContext = createContext({} as CheckBoxContextType) 
export const CheckBoxContextProvider = ({ latestMonth, children }: CheckBoxContextProviderProps) => {
    const [selectedMonths, setSelectedMonths] = useState< MonthOfJob | null >({month:[latestMonth]})
    return (
        <CheckBoxContext.Provider value={{ selectedMonths, setSelectedMonths }}>
            {children}
        </CheckBoxContext.Provider>
    )
}

// ******************************

type DBResultContextType = {
    dbResult: any | null
    dbResultComplete:any
    dbResultFailures:any
    jobTypeList:string[]
}
type DBResultContextProviderProps = {
    children: React.ReactNode
    dbResult: any
    jobTypeList:string[]
    dbResultComplete:any
    dbResultFailures:any
}
export const DBResultContext = createContext({} as DBResultContextType) 
export const DBResultContextProvider = ( {children,dbResult,jobTypeList,dbResultComplete,dbResultFailures }: DBResultContextProviderProps) => {

    return (
        <DBResultContext.Provider value={{ dbResult, jobTypeList,dbResultComplete,dbResultFailures }}>
            {children}
        </DBResultContext.Provider>
    )
}
