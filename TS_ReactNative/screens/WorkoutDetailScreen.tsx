import { StatusBar } from "expo-status-bar";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useEffect } from "react";
import * as types from "../types/data";
import data from "../data.json";
import WorkoutItem from "../components/WorkoutItem";

export function WorkoutDetailScreen({route}:{route:NativeStackHeaderProps['route']}) {

  useEffect(() => {
    console.log("rendering WorkoutDetail");
    return () => console.log("unmounting WorkoutDetail");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}> {(route.params as any).slug} </Text>
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
