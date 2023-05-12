import { StatusBar } from "expo-status-bar";
import { View, Text, Button } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useEffect } from "react";

export function HomeScreen({navigation}: any) {


  useEffect(()=>{
    console.log("rendering Home")
    return ()=> console.log("unmounting Home")
  },[])  

  return (
    <View>
      <Text> I Am Home </Text>
      <Button 
        title="Go to Planner"
        onPress={()=>navigation.navigate("Planner")}/>
    </View>
  );
}
