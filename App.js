import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { AuthProvider, useAuth } from './utils/authContext';

// Authencation Screens
import CreateAccount from './pages/user/CreateAccount';
import ForgotPassword from './pages/user/ForgotPassword';
import Login from './pages/user/Login';
import Profile from './pages/user/Profile';
import Signup from './pages/user/Signup';

// App (Main)  Screens
import CalmMain from './pages/calm/CalmMain';
import HydrationMain from './pages/hydration/HydrationMain';
import HydrationTracker from './pages/hydration/HydrationTracker';
import MainHub from './pages/MainHub';
import PlannerMain from './pages/planner/PlannerMain';
import CreatePost from './pages/social/CreatePost';
import Feed from './pages/social/Feed';
import FriendsPage from './pages/social/FriendsPage';
import FriendsProfile from './pages/social/FriendsProfile';
import MessageDetail from './pages/social/MessageDetail';
import MessagePage from './pages/social/MessagePage';
import PostDetail from './pages/social/PostDetail';
import Settings from './pages/social/Settings';
import SocialMain from './pages/social/SocialMain';
import TrophyPage from './pages/social/TrophyPage';
import WelcomePage from './pages/WelcomePage';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
      initialRouteName="WelcomePage"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="WelcomePage" component={WelcomePage} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
      initialRouteName="MainHub"
    >
      {/* Main */}
      <Stack.Screen name="MainHub" component={MainHub} />
      {/* Planner */}
      <Stack.Screen name="PlannerMain" component={PlannerMain} />
      {/* Hydration */}
      <Stack.Screen name="HydrationMain" component={HydrationMain} />
      <Stack.Screen name="HydrationTracker" component={HydrationTracker} />
      {/* Calm */}
      <Stack.Screen name="CalmMain" component={CalmMain} />
      {/* Social */}
      <Stack.Screen name="SocialMain" component={SocialMain} />
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="TrophyPage" component={TrophyPage} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="FriendsPage" component={FriendsPage} />
      <Stack.Screen name="MessagePage" component={MessagePage} />
      <Stack.Screen name="FriendsProfile" component={FriendsProfile} />
      <Stack.Screen name="MessageDetail" component={MessageDetail} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
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
