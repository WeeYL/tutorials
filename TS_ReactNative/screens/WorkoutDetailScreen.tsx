import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { DetailModal } from "../components/DetailModal";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { PressableText } from "../components/PressableText";
import { secToMins } from "../utils";
import { FontAwesome } from "@expo/vector-icons";

export function WorkoutDetailScreen({route}:{route:NativeStackHeaderProps['route']}) {
  // get workout
  const workout = useWorkoutBySlug((route.params as any).slug);

  return (
    <View style={styles.container}>
      <Text style={styles.header}> {workout?.name} </Text>
      <DetailModal
        activator={({handleOpen}) => // handle Open from props
            <PressableText
              onPress={handleOpen}
              text="Check Sequence"
            />
        }>
          <View>
            {workout?.sequence.map((si,idx)=>
              <View key={si.slug} style={styles.center}>
                <Text>
                  {si.type} | {si.name} | {si.reps} reps | {secToMins(si.duration)}
                </Text>
                { // No arrow after last line
                  idx !== workout.sequence.length &&
                    <FontAwesome 
                    name="arrow-down"
                    size={20}/>
                }
              </View>
              )}
          </View>
      </DetailModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    alignItems:'center'
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
