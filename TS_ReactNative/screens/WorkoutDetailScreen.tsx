import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { DetailModal } from "../components/DetailModal";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { PressableText } from "../components/PressableText";
import { secToMins } from "../utils";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SequenceItem } from "../types/data";
import { useCountDown } from "../hooks/useCountDown";

export function WorkoutDetailScreen({
  route,
}: {
  route: NativeStackHeaderProps["route"];
}) {
  const workout = useWorkoutBySlug((route.params as any).slug);
  const [trackerIdx, setTrackerIdx] = useState(-1); // to avoid self init
  const [sequence, setSequence] = useState<SequenceItem[]>([]);

  // start countdown and control timer (isRunning)
  const {countDown, isRunning, stop, start} = useCountDown(
    trackerIdx,
    
  );

  // add workout sequence
  const addItemToSequence = (idx: number) => {
    setSequence([...sequence, workout!.sequence[idx]]);
    setTrackerIdx(idx);


    start(workout!.sequence[idx].duration)
  };

  // countdown for each sequence
  useEffect(() => {
    if (!workout) {
      return;
    }

    if (trackerIdx === workout.sequence.length - 1) {
      return;
    }
    if (countDown === 0) {
      addItemToSequence(trackerIdx + 1);
    }
  }, [countDown]);

  // sequence end
  const hasReachedEnd: boolean =
    sequence.length === workout?.sequence.length && countDown === 0;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}> {workout?.name} </Text>
      {/* WORKOUT ITEM */}
      <DetailModal
        // WORKOUT SLUG
        activator={(
          { handleOpen } // handle Open from props
        ) => <PressableText onPress={handleOpen} text="Check Sequence" />}
      >
        {/* WORKOUT SEQUENCE */}
        <View>
          {workout?.sequence.map((si, idx) => (
            <View key={si.slug} style={styles.center}>
              <Text>
                {si.type} | {si.name} | {si.reps} reps |{" "}
                {secToMins(si.duration)}
              </Text>
              {
                // No arrow after last line
                idx !== workout.sequence.length && (
                  <FontAwesome name="arrow-down" size={20} />
                )
              }
            </View>
          ))}
        </View>
      </DetailModal>
      {/* Play Button */}
      <View>
        {sequence.length === 0 && (
          <FontAwesome
            name="play-circle-o"
            size={100}
            onPress={() => addItemToSequence(0)}
          />
        )}
      </View>
      {/* COUNTDOWN */}
      {sequence.length > 0 && countDown >= 0 && (
        <View>
          <Text style={styles.header}>{countDown}</Text>
        </View>
      )}
      {/* PROMPT */}

        <View>
          <Text style={styles.header}>      
            {
            sequence.length === 0 ? "prepare": hasReachedEnd ? "Great Job" :
            sequence[trackerIdx].name
          }
          </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
