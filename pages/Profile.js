import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [username, setUsername] = useState('');

  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const username = await AsyncStorage.getItem('curr_username');
            setUsername(username);
        } catch (e) {
            // Handle errors here
            console.error("Error retrieving data", e);
        }
    };

    const getProfileData = async () => {
      try {
        const response = await axios.get(`https://d399-2001-56a-7d82-ae00-1556-d777-fa9d-9ec8.ngrok-free.app/get_profile_data/${username}`);
        if (response.data.success) {
            // console.log("Retrieved profile data successfully:", response.data);
            // Do something with the retrieved profile data
            const userData = response.data.data;
            console.log(userData.fullName);
            console.log(userData.fullName);
            setName(userData.fullName);
            setEmail(userData.email);
            setPhoneNumber(userData.phoneNumber);
            setDateOfBirth(userData.dateOfBirth);
            setEmergencyContact(userData.emergencyContact);
  
        } else {
            // Update failed
            console.error('Profile data retrieval failed:', response.data.message);
        }
      } catch (error) {
          //console.error('Error retrieving profile data:', error);
      }
    }

    fetchData();
    getProfileData();
  }, [username]); // Empty dependency array ensures this runs once after the component mounts


  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Profile</Text>
        
      </View>

      <View style={styles.iconContainer}>
        {/* Golden Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")} style={styles.iconButton}>
        <Text style={styles.goldenIconText}>Edit</Text>
          <Icon name="edit" style={styles.goldenIcon} />
        </TouchableOpacity>
      </View>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      {/* Phone Number Input */}
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      {/* Date of Birth Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={dateOfBirth}
          onChangeText={(text) => setDateOfBirth(text)}
        />
      </View>

      {/* Emergency Contact Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Emergency Contact</Text>
        <TextInput
          style={styles.input}
          value={emergencyContact}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>
      
      <View style={styles.iconContainer}>

        {/* Home Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("MainPage")} style={styles.iconButton}>
          <Icon name="home" style={styles.icon} />
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.iconButton}>
            <Icon name="user" style={styles.specificIcon} />
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
    alignItems: 'center',
    paddingTop: 35, // Add padding to the top
    paddingBottom: 10, // Add padding to the bottom
  },
  
    text: {
        color: '#DEB992',
        fontSize: 50,
    },
    userIcon: {
        marginLeft: 10,
        fontSize: 20,
        color: '#DEB992',
    },
    iconContainer: {
        flexDirection: 'row',
        paddingTop: 65, // Add padding to the top
        paddingBottom: 20, // Add padding to the bottom
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
    goldenIcon: {
      color: '#DEB992',
      fontSize: 28,
    },

    goldenIconText: {
      color: '#DEB992',
      fontSize: 23,
      marginLeft: 1
    },

    inputContainer: {
      marginVertical: 10,
      width: '80%',
    },
    label: {
      color: '#DEB992',
      fontSize: 18,
      marginBottom: 5,
    },
    input: {
      backgroundColor: '#1A1A1A',
      color: '#DEB992',
      padding: 10,
      borderRadius: 5,
      borderColor: '#1BA098',
      borderTopWidth: 1, // Add top border
      borderBottomWidth: 1, // Add bottom border
      borderLeftWidth: 1, // Add left border
      borderRightWidth: 1, // Add right border
    },
    textSmall: {
      color: '#DEB992',

    }
});