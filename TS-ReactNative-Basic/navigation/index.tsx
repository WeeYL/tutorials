import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as Screens from "../screens";

// NOTE
// https://reactnavigation.org/docs/navigating
// NavigationContainer manages the Stacks
// Stacks returns the screen

const Stack = createNativeStackNavigator();



export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Screens.HomeScreen} />
        <Stack.Screen name="Detail" component={Screens.DetailScreen}  />
        <Stack.Screen name="UseEffect" component={Screens.UseEffectScreen} />
        <Stack.Screen name="API" component={Screens.APISCreen} />
        <Stack.Screen name="Default1" component={Screens.DefaultScreen1} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
