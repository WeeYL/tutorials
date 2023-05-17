import { Workout } from './../types/data';
import { containsKey } from "./util";
import data from "../data.json";
import * as storage from "./util";

export const getWorkouts = async (): Promise<Workout[]> => {
  // get data
  const workouts = await storage.getData("workout-data");
  return workouts;
};

export const getWorkoutBySlug= async (slug:string): Promise<Workout> => {
  // get all workouts and get the workout based on slug
  const workouts = await getWorkouts()
  const workout = workouts.filter((w)=>w.slug===slug)[0]
  return workout
}

export const initWorkouts = async (): Promise<Boolean> => {
  // check and store data
  const hasWorkout = await containsKey("workout-data");
  if (!hasWorkout) {
    console.log("storing data");
    await storage.storeData("workout-data", data);
    return true;
  }
  return false;
};

export const clearWorkouts =async () => {
  // remove data
  await storage.removeItem("workout-data")
}