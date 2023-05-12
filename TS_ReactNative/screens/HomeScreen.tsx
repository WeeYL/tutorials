import { StatusBar } from "expo-status-bar";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import * as types from '../types/data'
import data from '../data.json'
import WorkoutItem from "../components/WorkoutItem";

export function HomeScreen({navigation}: any) {

  useEffect(()=>{
    console.log("rendering Home")
    return ()=> console.log("unmounting Home")
  },[])  


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Work Out</Text>

      <FlatList
        data={data as types.Workout[]}
        renderItem={WorkoutItem}
        keyExtractor={item=>item.slug}
      />
      <Button 
        title="Go to Planner"
        onPress={()=>navigation.navigate("Planner")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    padding:20
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
},
})