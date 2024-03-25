import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  React, { useState, useEffect } from 'react';
import { BloodGlucoseLineChart } from './BloodGlucoseAnalytics';
import { PressureLineChart } from './PressureAnalytics';


export default function MainPage({navigation}) {

  useEffect(() => {
    const fetchData = async () => {
        try {
            const username = await AsyncStorage.getItem('curr_username');
            const patientID = await AsyncStorage.getItem('patientID');
            const role = await AsyncStorage.getItem('userRole');

            // Do something with the retrieved values
            console.log(username, patientID, role);
        } catch (e) {
            // Handle errors here
            console.error("Error retrieving data", e);
        }
    };
    fetchData();
}, []); // Empty dependency array ensures this runs once after the component mounts

  return (
    <View style={styles.container}>

      <View style={styles.container}>

        <Text style={styles.titleText}>Welcome, User</Text> 
      
        <Icon name="user" style={styles.iconUp} />

      {/* Display Blood Glucose Line Chart */}
      {/* <BloodGlucoseLineChart selectedView="weekly" />
      <PressureLineChart selectedView="weekly" /> */}
      
      {/* Pair Device Button */}

      <TouchableOpacity onPress={() => navigation.navigate("PersonalMetrics")} style={styles.buttonContainer}>
      <Icon name="profile" style={styles.icon} />
      <TouchableOpacity onPress={() => navigation.navigate("PersonalMetrics")} style={styles.textContainer}>
        <Text style={styles.text}>Metrics</Text>
      </TouchableOpacity>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate("Feedback")} style={styles.buttonContainer}>
        <Icon name="mail" style={styles.icon} />
        <TouchableOpacity onPress={() => navigation.navigate("Feedback")} style={styles.textContainer}>
          <Text style={styles.text}>Feedback</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Bluetooth")} style={styles.buttonContainer}>
        <MaterialIcons name="bluetooth" style={styles.icon} />
        <TouchableOpacity onPress={() => navigation.navigate("Bluetooth")} style={styles.textContainer}>
          <Text style={styles.text}>Pair Device</Text>
        </TouchableOpacity>
      </TouchableOpacity>
        
      </View>
      
      <View style={styles.iconContainer}>

        {/* Home Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("MainPage")} style={styles.iconButton}>
            <Icon name="home" style={styles.specificIcon} />
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.iconButton}>
            <Icon name="user" style={styles.bottomicon} />
        </TouchableOpacity>
        
        {/* Line Chart Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("BloodGlucoseAnalytics")} style={styles.iconButton}>
          <Icon name="linechart" style={styles.bottomicon} />
        </TouchableOpacity>
        
        {/* Dot Chart Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("PressureAnalytics")} style={styles.iconButton}>
          <Icon name="dotchart" style={styles.bottomicon} />
        </TouchableOpacity>
        
        {/* Settings Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.iconButton}>
          <Icon name="setting" style={styles.bottomicon} />
        </TouchableOpacity>

      </View>

    </View>
  );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051622',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around', // Align icons to the bottom
        paddingBottom: 20, // Add padding to bottom
    },
    titleText: {
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
    bottomicon: {
        fontSize: 30,
        color: '#DEB992',
    },
    iconUp: {
      fontSize: 50,
      color: '#DEB992',
      paddingBottom: -30,
      paddingTop: 0
  },
    specificIcon: {
        fontSize: 30,
        color: '#1BA098',
    },
    pairDeviceContainer: {
      alignItems: 'center',
      marginTop: -10, // Adjust this value based on your preference
      marginBottom: 20,
    },
    
    pairDeviceButton: {
      backgroundColor: '#1BA098',
      paddingVertical: 8, // Increase vertical padding
      borderRadius: 10, // Increase border radius
    },
    
    metricsButtonText: {
      color: '#DEB992',
      fontSize: 24, // Increase font size
      paddingLeft: 85
    },

    feedbackButtonText: {
      color: '#DEB992',
      fontSize: 24, // Increase font size
      paddingLeft: 75
    },

    pairDeviceButtonText: {
      color: '#DEB992',
      fontSize: 24, // Increase font size
      paddingLeft: 70
    },

    buttonContainer: {
      flexDirection: 'row', // align items horizontally
      alignItems: 'center', // align items vertically
      padding: 15, // adjust padding as needed
      borderWidth: 2, // example border width
      borderColor: '#1BA098', // example border color
      borderRadius: 10, // example border radius
      marginBottom: 10, // adjust margin bottom as needed
      width: 250,
    },
    icon: {
      fontSize: 20, // adjust icon size as needed
      marginRight: 10, // adjust margin right as needed
      color: '#1BA098',
    },
    textContainer: {
      flex: 1, // take up remaining space
    },
    text: {
      fontSize: 16, // adjust text size as needed
      color: '#DEB992',
      fontWeight: 'bold'
    },
    
});