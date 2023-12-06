// LoginPage.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';

const LoginPage = ({ navigation }) => {
  const handleLoginPress = () => {
    console.log('Login button pressed!');
    // Add your login logic here
    // You can navigate to the main page after successful login
    navigation.navigate('LoginPage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Page</Text>
      {/* Add your login UI components here */}
      <Button onPress={handleLoginPress} title="Login" />
    </View>
  );
};

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
  // Add styles for your login UI components
});

export default LoginPage;
