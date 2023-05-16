import { StatusBar } from "expo-status-bar";
import { View, Text, Button } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useEffect } from "react";

export function PlannerScreen({navigation}:{navigation:NativeStackHeaderProps['navigation']}) {
    useEffect(()=>{
        // mounting  
      console.log("rendering Planner")
        // unmount
        return ()=> console.log("unmounting Planner")
      },[])  
      
    return (
    <View>
      <Text> I Am Planner </Text>
      <Button 
        title="Go to Home"
        // navigate function as other components are in a nested navigator
        onPress={()=>navigation.navigate("Home")}/>
    </View>
  );
}
