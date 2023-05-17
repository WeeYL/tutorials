import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { DetailModal } from "../components/DetailModal";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { PressableText } from "../components/PressableText";

export function WorkoutDetailScreen({route}:{route:NativeStackHeaderProps['route']}) {
  // get workout
  const workout = useWorkoutBySlug((route.params as any).slug);

  return (
    <View style={styles.container}>
      <Text style={styles.header}> {workout?.name} </Text>
      <DetailModal activator={()=>
        <PressableText
          onPress={()=>{alert("opening")}}
          text="Check Sequence"
        />
      }/>
      <DetailModal/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});