import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import * as types from "../types/data";

export default function WorkoutItem({ item }: { item: types.Workout }) {
  return (
      <View style={styles.container}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.difficulty}>Difficulty: {item.difficulty}</Text>
        <Text style={styles.duration}>Duration: {item.duration}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      borderColor: "rgba(0,0,0, 0.1)",
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      backgroundColor: "#fff",
      flex: 1
    },

    name: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
    },
    duration: {
      fontSize: 15,
    },
    difficulty: {
      fontSize: 15
    }
  })
  