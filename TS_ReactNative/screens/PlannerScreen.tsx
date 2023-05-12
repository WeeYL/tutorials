import { StatusBar } from "expo-status-bar";
import { View, Text, Button } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useEffect } from "react";

export function PlannerScreen({navigation}: any) {
    useEffect(()=>{
        console.log("rendering Planner")
        return ()=> console.log("unmounting Planner")
      },[])  
      
    return (
    <View>
      <Text> I Am Planner </Text>
      <Button 
        title="Go to Home"
        onPress={()=>navigation.navigate("Home")}/>
    </View>
  );
}
