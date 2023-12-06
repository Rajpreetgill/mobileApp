import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from './components/Button';
import LoginPage from './pages/LoginPage';
// import Navigation from './Navigation.js';
// import { useNavigation } from '@react-navigation/native';
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator()
// const navigation = useNavigation();

const App = () => {

  const handleButtonPress = () => {
    console.log('Button pressed!');
    // Add your button press logic here
  };
  
  const handleLoginPress = () => {
    console.log('Login button pressed!');
    // Add your logic to navigate to the login page
    navigation.navigate('LoginPage');
  };

  return (
    <View style={styles.container}>

        <Text style={styles.text}>I-SOLE</Text>
        <Image source={require('./images/Logo.png')} style={styles.image} />
        <Button onPress={handleLoginPress} title="Login" />
        <Button onPress={handleButtonPress} title="Signup" />
        <StatusBar style="auto" />
        
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#051622',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#DEB992',
    fontSize: 30,
  },
  image: {
    width: 200,
    height: 200,
  }

});


export default App;
