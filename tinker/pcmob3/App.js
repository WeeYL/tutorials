import { NavigationContainer } from "@react-navigation/native";
import React, {useEffect} from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";
import NotesStack from "./screens/NotesStack";
import AddScreen from "./screens/AddScreen";

const Stack = createStackNavigator();

export default function App() {

 return (
   <NavigationContainer>
     <Stack.Navigator screenOptions={{ presentation: 'modal' }} >
       <Stack.Screen
         name="Notes Stack"
         component={NotesStack}
         options={{ headerShown: false, headerMode:false }}
         scree
       />
       <Stack.Screen name="Add Note" component={AddScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}


