import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function Profile({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [username, setUsername] = useState('');

  
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const username = await AsyncStorage.getItem('curr_username');
          setUsername(username);
          getProfileData(username); // You can call getProfileData here
        } catch (e) {
          // Handle errors here
          console.error("Error retrieving data", e);
        }
      };
  
      fetchData();
      console.log("This was run!");
    }, [getProfileData]) // Add getProfileData to the dependency array
  );
  

  const getProfileData = async (username) => {
    try {
      const response = await axios.get(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/get_profile_data/${username}`);
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


  return (
    <View style={styles.container}>

      <View style={styles.iconContainer}>
      <Text style={styles.text}>Profile</Text>
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
      
      <View style={styles.iconContainerBottom}>

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
          <Fontisto name="blood-drop" style={styles.icon} />
        </TouchableOpacity>
        
        {/* Dot Chart Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("PressureAnalytics")} style={styles.iconButton}>
          <MaterialCommunityIcons name="foot-print" style={styles.icon} />
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
  iconContainerBottom: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 65,
    paddingBottom: 20,
    backgroundColor: '#051622', // Add background color to match the container
    justifyContent: 'space-around', // Align items horizontally with equal spacing
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