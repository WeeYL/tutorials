import { containsKey } from "./util";
import { Workout } from "../types/data";
import data from "../data.json";
import * as storage from "./util";

export const getWorkouts = async (): Promise<Workout[]> => {
  const workout = await storage.getData("workout-data");
  return workout;
};

export const initWorkouts = async (): Promise<Boolean> => {
  const hasWorkout = await containsKey("workout-data");
  if (!hasWorkout) {
    console.log("storing data");
    await storage.storeData("workout-data", data);
    return true;
  }
  return false;
};

export const clearWorkouts =async () => {
  await storage.removeItem("workout-data")
}