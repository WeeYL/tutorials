import { useEffect, useState } from "react"
import { getWorkouts } from "../storage/workouts"
import * as types from '../types/data'
import { useIsFocused } from "@react-navigation/native"


export const useWorkouts = () =>{

    const [workouts, setWorkouts] = useState<types.Workout[]>([])
    const isFocused = useIsFocused()

    useEffect(()=>{
      
      async function getData() {
        setWorkouts(await getWorkouts())
        console.log("getting data")
      }      
      // load data whenever it is on Home Screen
      if (isFocused) {
        getData()
      }
    },[isFocused])  

    return workouts
}