import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Button from '../components/Button';
import TextField from '../components/TextField';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PersonalMetrics({navigation}) {

  const [bloodGlucoseLevel, setBloodGlucoseLevel] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [insulinDosage, setInsulinDosage] = useState('');

  const handleSubmit = async (e) => { // Change the function name to handleSignIn
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
        console.error("HERE");
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>

      <View style={styles.container}>
        <Text style={styles.text}>Personal Metrics Page</Text>
      </View>

      <View style={styles.formContainer}>

        <View style={styles.rowContainer}>
          <TextField
            label="Blood Glucose Level"
            placeholder="Ex. 10.6"
            onChangeText={(text) => setBloodGlucoseLevel(text)}
            value={bloodGlucoseLevel}
            width = {'60%'}
          />
          <Button onPress={() => handleSubmit()} title="Submit" />
        </View>

        <View>
          <View style={styles.rowContainer}>
            <TextField
              label="Weight"
              placeholder="Ex. 10.6"
              onChangeText={(text) => setWeight(text)}
              value={weight}
              width = {80}
            />
            <TextField
              label="Height"
              placeholder="Ex. 10.6"
              onChangeText={(text) => setHeight(text)}
              value={height}
            />
            <TextField
            label="Insulin Dosage"
            placeholder="10.6"
            onChangeText={(text) => setInsulinDosage(text)}
            value={insulinDosage}
            />
          </View>
          
          <TextField
            label="Allergies"
            placeholder="10.6"
            onChangeText={(text) => setAllergies(text)}
            value={allergies}
          />
          <Button onPress={() => handleSubmit()} title="Save Changes" />
        </View>

        <TextField
          label="Meal Type"
          placeholder="10.6"
          onChangeText={(text) => setInsulinDosage(text)}
          value={insulinDosage}
        />
        <Button onPress={() => handleSubmit()} title="Add" />
        <Button onPress={() => handleSubmit()} title="Meal Summary" />

        <TextField
          label="Activity Type"
          placeholder="10.6"
          onChangeText={(text) => setInsulinDosage(text)}
          value={insulinDosage}
        />
        <Button onPress={() => handleSubmit()} title="Add" />
        <Button onPress={() => handleSubmit()} title="Activity Summary" />


      </View>
      
      <View style={styles.iconContainer}>

        {/* Home Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("MainPage")} style={styles.iconButton}>
            <Icon name="home" style={styles.icon} />
          </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.iconButton}>
            <Icon name="user" style={styles.icon} />
        </TouchableOpacity>
        
        {/* Line Chart Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("BloodGlucoseAnalytics")} style={styles.iconButton}>
          <Icon name="linechart" style={styles.icon} />
        </TouchableOpacity>
        
        {/* Dot Chart Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("PressureAnalytics")} style={styles.iconButton}>
          <Icon name="dotchart" style={styles.icon} />
        </TouchableOpacity>
        
        {/* Settings Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Seetings")} style={styles.iconButton}>
          <Icon name="setting" style={styles.icon} />
        </TouchableOpacity>

      </View>

    </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: '#051622',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#051622',
        alignItems: 'center',
        justifyContent: 'center', // Align icons to the bottom
        paddingBottom: 20, // Add padding to bottom
    },
    text: {
        color: '#DEB992',
        fontSize: 30,
    },
    userIcon: {
        marginLeft: 10,
        fontSize: 20,
        color: '#DEB992',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    iconButton: {
        marginHorizontal: 20, // Add more space between icons
    },
    icon: {
        fontSize: 30,
        color: '#DEB992',
    },
    specificIcon: {
        fontSize: 30,
        color: '#1BA098',
    },
    rowContainer: {
      flexDirection: 'row', // Arrange items horizontally
      alignItems: 'center', // Align items vertically in the center
      justifyContent: 'space-evenly', // Align items horizontally in the center
      width: '100%',
    },
});