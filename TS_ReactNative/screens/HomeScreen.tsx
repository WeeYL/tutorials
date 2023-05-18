import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import WorkoutItem from "../components/WorkoutItem";
import * as hooks from "../hooks";

export function HomeScreen({navigation}:{navigation:NativeStackHeaderProps['navigation']}) {

  // load workouts
  const workouts = hooks.useWorkouts()

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Work Out</Text>

      <FlatList
        data={workouts}
        // rendering each item from data
        renderItem={({item})=>{
          return (
            // navigation WorkoutDetailScreen and pass object
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