import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthProvider, useAuth } from "./utils/authContext";

// Authencation Screens
import CreateAccount from "./pages/user/CreateAccount";
import ForgotPassword from "./pages/user/ForgotPassword";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import Signup from "./pages/user/Signup";

// App (Main)  Screens
import CalmMain from "./pages/calm/CalmMain";
import HydrationMain from "./pages/hydration/HydrationMain";
import HydrationTracker from "./pages/hydration/HydrationTracker";
import MainHub from "./pages/MainHub";
import PlannerDetails from "./pages/planner/PlannerDetails";
import PlannerList from "./pages/planner/PlannerList";
import PlannerMain from "./pages/planner/PlannerMain";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName="MainHub"
    >
      {/* Main */}
      <Stack.Screen name="MainHub" component={MainHub} />
      {/* Planner */}
      <Stack.Screen name="PlannerList" component={PlannerList} />
      <Stack.Screen name="PlannerDetails" component={PlannerDetails} />
      <Stack.Screen name="PlannerMain" component={PlannerMain} />
      {/* Hydration */}
      <Stack.Screen name="HydrationMain" component={HydrationMain} />
      <Stack.Screen name="HydrationTracker" component={HydrationTracker} />
      {/* Calm */}
      <Stack.Screen name="CalmMain" component={CalmMain} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return session ? <AppStack /> : <AuthStack />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
