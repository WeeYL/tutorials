import { StatusBar } from "expo-status-bar";
import { View, Text, Button } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";


export function PlannerScreen({navigation}: any) {
  return (
    <View>
      <Text> I Am Planner </Text>
      <Button 
        title="Go to Home"
        onPress={()=>navigation.navigate("Home")}/>
    </View>
  );
}
