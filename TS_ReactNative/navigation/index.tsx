import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native'
import { HomeScreen, PlannerScreen } from '../screens';
import { AntDesign } from '@expo/vector-icons';

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
            <Stack.Screen name="root" component={BottomTabNavigator} options={{headerShown: false}}/>
          </Stack.Navigator>
      );
}

function BottomTabNavigator(){
    return (
          <BottomTab.Navigator initialRouteName='Home'>
            <BottomTab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon:()=> <Text>Home</Text>
            }}/>
            <AntDesign name="home" size={24} color="black" />
            <BottomTab.Screen name="Planner" component={PlannerScreen} options={{
                tabBarIcon:()=> <Text>Planner</Text>
            }} />
          </BottomTab.Navigator>
      );
}