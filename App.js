import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from './components/Button';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './pages/HomeScreen';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import BloodGlucoseAnalytics from './pages/BloodGlucoseAnalytics';
import PressureAnalytics from './pages/PressureAnalytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import PersonalMetrics from './pages/PersonalMetrics';
import Feedback from './pages/Feedback';
// import Bluetooth from './pages/Bluetooth';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="BloodGlucoseAnalytics" component={BloodGlucoseAnalytics} />
        <Stack.Screen name="PressureAnalytics" component={PressureAnalytics} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PersonalMetrics" component={PersonalMetrics} />
        <Stack.Screen name="Feedback" component={Feedback} />
        {/* <Stack.Screen name="Bluetooth" component={Bluetooth} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    
  );

}
