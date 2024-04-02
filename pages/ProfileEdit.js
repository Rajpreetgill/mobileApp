import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
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
          const usrname = await AsyncStorage.getItem('curr_username');
          setUsername(usrname);
            // Do something with the retrieved values
        } catch (e) {
            // Handle errors here
            console.error("Error retrieving data", e);
        }
    };
    fetchData();
  }, [username]); // Empty dependency array ensures this runs once after the component mounts

  const nameSave = async (e) => {
    if(username != '')
    {
      try {
        // Make a POST request to your backend sign-in endpoint
        const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_name`, {
          username: username, // Use the username state variable
          name: name,
        });
        if (response.data.success) {
          console.log("Name updated successfully");
        } 
        else {
          // Update failed
          console.error('Name update failed:', response.data.message);
        }

      } catch (error) {
          console.error('Error updating name:', error);
      }
    }
  };

  const emailSave = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_email`, {
        username: username, // Use the username state variable
        email: email,
      });
      if (response.data.success) {
        console.log("Email updated successfully");
      } 
      else {
        // Update failed
        console.error('Email update failed:', response.data.message);
      }
    } catch (error) {
        console.error('Error updating email:', error);
    }
  };

  const phoneNumberSave = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_phone_number`, {
        username: username, // Use the username state variable
        phoneNumber: phoneNumber,
      });
      if (response.data.success) {
        console.log("Phone number updated successfully");
      } 
      else {
        // Update failed
        console.error('Phone number update failed:', response.data.message);
      }
    } catch (error) {
        console.error('Error updating phone number:', error);
    }
  };

  const dateOfBirthSave = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_date_of_birth`, {
        username: username, // Use the username state variable
        dateOfBirth: dateOfBirth,
      });
      if (response.data.success) {
        console.log("Date of birth updated successfully");
      } 
      else {
        // Update failed
        console.error('Date of birth update failed:', response.data.message);
      }
    } catch (error) {
        console.error('Error updating date of birth:', error);
    }
  };

  const emergencyContactSave = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_emergency_contact`, {
        username: username, // Use the username state variable
        emergencyContact: emergencyContact,
      });
      if (response.data.success) {
        console.log("Emergency contact updated successfully");
      } 
      else {
        // Update failed
        console.error('Emergency contact update failed:', response.data.message);
      }
    } catch (error) {
        console.error('Error updating emergency contact:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.backContainer}>
        {/* Golden Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.iconButton}>
        <Icon name="left" style={styles.goldenIcon} />
        <Text style={styles.goldenIconText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        <Text style={styles.text}>Edit Profile</Text>
      </View>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.rowContainer}>
            <TextInput
            style={[styles.input, { width: 200 }]}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder='Ex: Austin'
            />
            <Button onPress={() => nameSave()} title="Save" />
        </View>
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.rowContainer}>
            <TextInput
            style={[styles.input, { width: 200 }]}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder='Ex: austin@gmail.com'
            />
            <Button onPress={() => emailSave()} title="Save" />
        </View>
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.rowContainer}>
            <TextInput
                 style={[styles.input, { width: 200 }]}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholder='Ex: 403-888-888'
            />
            <Button onPress={() => phoneNumberSave()} title="Save" />
        </View>
      </View>

      {/* Date of Birth Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.rowContainer}>
            <TextInput
            style={[styles.input, { width: 200 }]}
            value={dateOfBirth}
            onChangeText={(text) => setDateOfBirth(text)}
            placeholder='Ex: DD/MM/YYYY'
            />
            <Button onPress={() => dateOfBirthSave()} title="Save" />
        </View>
      </View>

      {/* Emergency Contact Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Emergency Contact</Text>
        <View style={styles.rowContainer}>
            <TextInput
            style={[styles.input, { width: 200 }]}
            value={emergencyContact}
            onChangeText={(text) => setEmergencyContact(text)}
            placeholder='Ex: 403-888-888'
            />
            <Button onPress={() => emergencyContactSave()} title="Save" />
        </View>
      </View>
      </ScrollView>
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
        paddingTop: 0, // Add padding to the top
        paddingBottom: 90, // Add padding to the bottom
    },

    text: {
        color: '#DEB992',
        fontSize: 35,
        paddingTop: -25
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
        fontSize: 40,
    },
    goldenIconText: {
      color: '#DEB992',
      fontSize: 23,
      marginLeft: 1,
    },
    rowContainer: {
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Align items vertically in the center
        justifyContent: 'space-evenly', // Align items horizontally in the center
    },
    inputContainer: {
        marginVertical: 10,
        width: '80%',
        paddingRight: 20,
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
    backContainer: {
      flexDirection: 'row', // Arrange items horizontally
      alignItems: 'flex-start', // Align items vertically in the center
      justifyContent: 'space-around', // Align items horizontally in the center
      color: '#DEB992',
      paddingRight: 300,
    },
});