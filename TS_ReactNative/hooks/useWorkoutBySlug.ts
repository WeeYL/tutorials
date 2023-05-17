import { useEffect, useState } from "react"
import { getWorkoutBySlug } from "../storage/workouts"
import * as types from '../types/data'
import { useIsFocused } from "@react-navigation/native"


export const useWorkoutBySlug = (slug:string) =>{

    // set workout based on slug param
    const [workout, setWorkout] = useState<types.Workout>()
    const isFocused = useIsFocused()

    useEffect(()=>{
      async function getData() {
        setWorkout(await getWorkoutBySlug(slug))

      }      
      if (isFocused) {
        getData()
      }

    },[isFocused])  

    return workout
}