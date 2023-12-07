import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Button from '../components/Button';
import TextField from '../components/TextField';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = () => {
    console.log('Login button pressed!');
    console.log('Username:', username);
    console.log('Password:', password);
    // Add your login logic here
  };

  const handleForgotPasswordPress = () => {
    console.log('Forgot Password clicked!');
    // Add your logic for Forgot Password here
  };

  const handleRegisterPress = () => {
    console.log('Register clicked!');
    // Add your logic for Register here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <View style={styles.formContainer}>
        <TextField
          label="Username"
          placeholder="Username"
          iconName="user"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextField
          label="Password"
          placeholder="Password"
          iconName="lock"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
        <Button onPress={handleLoginPress} title="Login" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#051622',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: '#DEB992',
    fontSize: 30,
    marginTop: 100,
    marginBottom: 0, 
  },
  formContainer: {
    flex: 1,
    width: '100%', // Set the width to 100% to take up the full width
    marginTop: 10,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center',
  },
  link: {
    color: '#DEB992',
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
});

export default LoginPage;