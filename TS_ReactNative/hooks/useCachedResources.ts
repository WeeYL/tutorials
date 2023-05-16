import { useEffect, useState } from "react";
import * as Font from "expo-font";
import * as storage from "../storage/util";
import { getWorkouts, initWorkouts } from "../storage/workouts";

export function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await initWorkouts();
        await Font.loadAsync({
          montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
          "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        const workouts = await getWorkouts()
        console.log(workouts)
        setIsLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
