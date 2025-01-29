import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CalmMain from "./pages/calm/CalmMain";
import HydrationMain from "./pages/hydration/HydrationMain";
import HydrationTracker from "./pages/hydration/HydrationTracker";
import MainHub from "./pages/MainHub";
import PlannerDetails from "./pages/planner/PlannerDetails";
import PlannerList from "./pages/planner/PlannerList";
import PlannerMain from "./pages/planner/PlannerMain";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import Signup from "./pages/user/Signup";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        {/* User-related Screens */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Profile" component={Profile} />

        {/* Todo-related Screens */}
        <Stack.Screen name="PlannerList" component={PlannerList} />
        <Stack.Screen name="PlannerDetails" component={PlannerDetails} />
        <Stack.Screen name="PlannerMain" component={PlannerMain} />

        {/* Calm-related Screens */}
        <Stack.Screen name="CalmMain" component={CalmMain} />

        {/* Hydration-related Screens */}
        <Stack.Screen name="HydrationMain" component={HydrationMain} />
        <Stack.Screen name="HydrationTracker" component={HydrationTracker} />

        {/* Main Hub */}
        <Stack.Screen name="MainHub" component={MainHub} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
