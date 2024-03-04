import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  React, { useState, useEffect } from 'react';


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
        <Text style={styles.text}>Welcome, User</Text>
       
        <TouchableOpacity onPress={() => navigation.navigate("PersonalMetrics")} style={styles.iconButton}>
            <Icon name="profile" style={styles.icon} />
        </TouchableOpacity>
       
        <TouchableOpacity onPress={() => navigation.navigate("Feedback")} style={styles.iconButton}>
            <Icon name="mail" style={styles.icon} />
        </TouchableOpacity>
       
        <TouchableOpacity onPress={() => navigation.navigate("Bluetooth")} style={styles.iconButton}>
            <MaterialIcons name="bluetooth" style={styles.icon} />
        </TouchableOpacity>
        
      </View>
      
      <View style={styles.iconContainer}>

        {/* Home Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("MainPage")} style={styles.iconButton}>
            <Icon name="home" style={styles.specificIcon} />
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
    }
});