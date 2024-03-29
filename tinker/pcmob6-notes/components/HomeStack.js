import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { NOTES_SCREEN, PROFILE_SCREEN } from "../constants";
import NotesScreenHome from "../screens/NotesScreenHome";
import ProfileScreen from "../screens/ProfileScreen";

const BottomTab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name == NOTES_SCREEN.Home) iconName = "list-alt";
          else iconName = "user";

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen name={NOTES_SCREEN.Home} component={NotesScreenHome} />
      <BottomTab.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
    </BottomTab.Navigator>
  );
}