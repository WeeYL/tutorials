import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native'
import { HomeScreen, PlannerScreen } from '../screens';
import { FontAwesome } from '@expo/vector-icons';

// NOTE 
// https://reactnavigation.org/docs/navigating

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator()

export default function Navigation() {
  return (
    // NavigationContainer manages the RootNavigator
    // RootNavigator returns the screen
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  );
}

function RootNavigator(){
    // RootNavigator returns the component
    return (
          <Stack.Navigator>
            <Stack.Screen name="root" component={BottomTabNavigator} options={{headerShown: false}}/>
          </Stack.Navigator>
      );
}

function BottomTabNavigator(){
    // BottomTabNavigator returns the components for screen and bottom tab
    return (
          <BottomTab.Navigator initialRouteName='Home'>
            <BottomTab.Screen name="Home" component={HomeScreen} 
              // add icon
              options={{ tabBarIcon:()=> <FontAwesome name="home" size={24} color="black" /> }} /> 
            <BottomTab.Screen name="Planner" component={PlannerScreen} options={{tabBarIcon:()=> <Text>Planner</Text> }} />
          </BottomTab.Navigator>
      );
}