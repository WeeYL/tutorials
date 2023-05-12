import { StatusBar } from "expo-status-bar";
import { View, Text, Button } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export function HomeScreen({navigation}: any) {
  return (
    <View>
      <Text> I Am Home </Text>
      <Button 
        title="Go to Planner"
        onPress={()=>navigation.navigate("Planner")}/>
    </View>
  );
}
