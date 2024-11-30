import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MainHub from "./pages/MainHub";
import PlannerDetails from "./pages/planner/PlannerDetails";
import PlannerList from "./pages/planner/PlannerList";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import Signup from "./pages/user/Signup";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* User-related Screens */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Profile" component={Profile} />

        {/* Todo-related Screens */}
        <Stack.Screen name="PlannerList" component={PlannerList} />
        <Stack.Screen name="PlannerDetails" component={PlannerDetails} />

      {/* Main Hub */}
      <Stack.Screen name="Main Hub" component={MainHub} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
