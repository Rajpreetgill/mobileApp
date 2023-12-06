// Navigation.js
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';
import LoginPage from './pages/LoginPage';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name="App" component={App} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default Navigation;
