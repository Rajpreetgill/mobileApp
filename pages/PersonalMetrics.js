import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Button from '../components/Button';
import TextField from '../components/TextField';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import textInputStyles from '../components/textInputStyle'; // Import styles from the file

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

      <View style={[styles.container, { marginBottom: -60 }]}>
        <Text style={styles.text}>Personal Metrics Page</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Blood Glucose Level</Text>
          <TextInput
            style={[styles.input, { width: 160 }]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setBloodGlucoseLevel(text)}
            value={bloodGlucoseLevel}
          />
          <Button onPress={() => handleSubmit()} title="Submit" />
        </View>
        <View style={styles.rowContainer}>
        <Text style={styles.label}>Weight</Text>
          <TextInput
            style={[styles.input, { width: 160 }]} // Manually setting width here
            placeholder="Ex. 55"
            onChangeText={(text) => setWeight(text)}
            value={weight}
          />
          <Button onPress={() => handleSubmit()} title="Submit" />
        </View>
        <View style={styles.rowContainer}>
        <Text style={styles.label}>Height</Text>
          <TextInput
            style={[styles.input, { width: 160}]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setHeight(text)}
            value={height}
          />
          <Button onPress={() => handleSubmit()} title="Submit" />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Insulin Dosage</Text>
          <TextInput
            style={[styles.input, { width: 160 }]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setInsulinDosage(text)}
            value={insulinDosage}
          />
          <Button onPress={() => handleSubmit()} title="Submit" />
        </View>
        <View style={styles.rowContainer}>
        <Text style={styles.label}>Allergies</Text>
        <TextInput
          style={[styles.input, { width: 160 }]} // Manually setting width here
          placeholder="Ex. 10.6"
          onChangeText={(text) => setAllergies(text)}
          value={allergies}
        />
        <Button onPress={() => handleSubmit()} title="Save Changes" />
        </View>
        <View style={styles.rowContainer}>
        <Text style={styles.label}>Meal Type</Text>
        <TextInput
          style={[styles.input, { width: 160 }]}
          placeholder="Ex. Breakfast, Lunch, Dinner"
          onChangeText={(text) => setMealType(text)}
          value={insulinDosage}
        />
        <Button onPress={() => handleSubmit()} title="Add" />
        </View>

        <Button onPress={() => handleSubmit()} title="Meal Summary" />

        <View style={styles.rowContainer}>
        <Text style={styles.label}>Activity Type</Text>
        <TextInput
        style={[styles.input, { width: 160 }]}
        placeholder="Ex. Walking, Running, Swimming"
        onChangeText={(text) => setInsulinDosage(text)}
        value={insulinDosage}
        />
        <Button onPress={() => handleSubmit()} title="Add" />
        </View>

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
        <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.iconButton}>
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
    formContainer: {
      flex: 1,
      flexDirection: 'column', // Arrange items horizontally
      //width: '100%', // Set the width to 100% to take up the full width
      justifyContent: 'space-evenly', // Center the content vertically
      alignItems: 'center',
    },
    rowContainer: {
      flexDirection: 'row', // Arrange items horizontally
      alignItems: 'center', // Align items vertically in the center
      justifyContent: 'space-evenly', // Align items horizontally in the center
    },

    input: {
      borderWidth: 1,
      borderColor: '#1BA098',
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
    },

    label: {
      marginRight: 10,
      color: '#DEB992',
      fontSize: 15,
      marginBottom: 4,
    },

    placeholder: {
      color: '#DEB992',
    }
});