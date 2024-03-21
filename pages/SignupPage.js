import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Button from '../components/Button';
import TextField from '../components/TextField';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupPage({navigation}) {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignup = async (e) => {
      console.log('Signup button pressed!');
      console.log('Email:', email);
      console.log('Username:', username);
      console.log('Password:', password);

      const role = "Patient";

      try {
        
        const signupResponse = await axios.post('https://i-sole-backend.com/signup', {
            username: username,
            email: email,
            password: password,
            fullName: fullname,
            role: role,
            patientID: role === 'Patient' ? '' : patientID,
        });

        if (signupResponse.data.success) {
            console.log("Account created successfully");

            const { patientID, role } = signupResponse.data.user_data;

            // Store the username in local storage
            await AsyncStorage.setItem('curr_username', username);
            await AsyncStorage.setItem('patientID', patientID);
            await AsyncStorage.setItem('userRole', role);

            // Call the initialize_counter endpoint only if role is 'Patient'
            if (role === 'Patient') {
              const counterResponse = await axios.post('https://i-sole-backend.com/initialize_counter', {
                username: username,
              });

              if (counterResponse.data.success) {
                console.log("Counter initialized successfully");
              } else {
                console.log("Failed to initialize counter");
              }
            }

            navigation.navigate("MainPage");
            
        } else {
            console.log("Failed to create account");
        }
      } catch (error) {
          console.error('Error during sign up:', error);
      }

    };
  
    const handleLoginPress = () => {
      console.log('Login clicked!');
      navigation.navigate("LoginPage")
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Signup</Text>
        <View style={styles.formContainer}>
          <TextField
            label="Full Name"
            placeholder="Full Name"
            iconName="user"
            onChangeText={(text) => setFullname(text)}
            value={fullname}
          />
          <TextField
            label="Username"
            placeholder="Username"
            iconName="user"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextField
            label="Email"
            placeholder="Email"
            iconName="mail"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextField
            label="Password"
            placeholder="Password"
            iconName="lock"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
          <Button onPress={handleSignup} title="Signup" />
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
      marginBottom: 0, // Adjust the marginBottom to move the "Login Page" higher
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