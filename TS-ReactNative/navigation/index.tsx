import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, PlannerScreen } from '../screens';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  );
}

function RootNavigator(){
    // nested navigation
    return (
          <Stack.Navigator>
            <Stack.Screen name="root" component={BottomTabNavigator} />
          </Stack.Navigator>
      );
}

function BottomTabNavigator(){
    return (
          <BottomTab.Navigator initialRouteName='Home'>
            <BottomTab.Screen name="Home" component={HomeScreen} />
            <BottomTab.Screen name="Planner" component={PlannerScreen} />
          </BottomTab.Navigator>
      );
}