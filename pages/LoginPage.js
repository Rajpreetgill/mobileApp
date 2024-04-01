import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Button from '../components/Button';
import TextField from '../components/TextField';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginPage({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState(null); // State for error message

  const handleForgotPasswordPress = () => {
    console.log('Forgot Password clicked!');
    // Add your logic for Forgot Password here
  };

  const handleRegisterPress = () => {
    console.log('Register clicked!');
    navigation.navigate("SignupPage");
    // Add your logic for Register here
  };

  const handleSignIn = async (e) => { // Change the function name to handleSignIn
    // e.preventDefault();

    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post('https://i-sole-backend.com/signin', {
        username: username, // Use the username state variable
        password: password,
      });

      if (response.data.success) {
        // Authentication successful
        const { username, patientID, role } = response.data.user_data;
        console.log(patientID);
        // Store curr_username and patientID in local storage
        await AsyncStorage.setItem('curr_username', username);
        await AsyncStorage.setItem('patientID', patientID.toString()); // Assuming patientID is a number
        await AsyncStorage.setItem('userRole', role);
        
        // Log curr_username for debugging
        console.log('curr_username:', username);

        // Navigate to Main Page
        navigation.navigate("MainPage");
      } 
      else {
        // Authentication failed, handle the error (e.g., show an error message)
        console.error('Sign-in failed:', response.data.message);
        setLoginErrorMessage("Incorrect Username or Password");
      }

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setLoginErrorMessage("Incorrect Username or Password");
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      console.error(error.config);
    }

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
          width='50%'
        />
        {loginErrorMessage && (
          <Text style={styles.error}>{loginErrorMessage}</Text>
        )}
        <TextField
          label="Password"
          placeholder="Password"
          iconName="lock"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          width='50%'
        />
        {loginErrorMessage && (
          <Text style={styles.error}>{loginErrorMessage}</Text>
        )}
        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
        <Button onPress={() => handleSignIn()} title="Login" />
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
  error: { // Style for error message
    color: 'red',
    fontSize: 12,
  },
});