import { StatusBar } from "expo-status-bar";
import { View, Text, FlatList, Button, StyleSheet, Pressable } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import * as types from '../types/data'
import data from '../data.json'
import WorkoutItem from "../components/WorkoutItem";

export function HomeScreen({navigation}:{navigation:NativeStackHeaderProps['navigation']}) {

  useEffect(()=>{
    console.log("rendering Home")
    return ()=> console.log("unmounting Home")
  },[])  


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Work Out</Text>

      <FlatList
        data={data as types.Workout[]}
        // rendering each item from data. item here is infered as types.Workout from data
        renderItem={({item})=>{
          return (
            // navigation pass screen and object
            <Pressable onPress={()=> navigation.navigate("WorkoutDetail", {slug:item.slug})}>
              <WorkoutItem item={item}/>
            </Pressable>
          )
        }}
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