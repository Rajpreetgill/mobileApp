import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Profile({navigation}) {
  const [name, setName] = useState('Ex: Austin');
  const [email, setEmail] = useState('Ex: austin@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('Ex: 403-888-888');
  const [dateOfBirth, setDateOfBirth] = useState('Ex: DD/MM/YYYY');
  const [emergencyContact, setEmergencyContact] = useState('Ex: 403-888-888');

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Profile</Text>
      </View>

      <View style={styles.iconContainer}>
            {/* Golden Profile Icon */}
            <Icon name="user" style={[styles.goldenIcon]} />
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
        <TouchableOpacity onPress={() => navigation.navigate("Seetings")} style={styles.iconButton}>
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
        fontSize: 30,
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
      fontSize: 65,
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
});