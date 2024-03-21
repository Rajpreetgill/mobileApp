import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch } from 'react-native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Settings({navigation}) {
  const [notifications, setNotifications] = useState(false);
  const [allowActivity, setAllowActivity] = useState(false);
  const [allowMeals, setAllowMeals] = useState(false);
  const [allowDoctorsFeedback, setAllowDoctorsFeedback] = useState(false);

  const toggleSwitch = (toggleFunction) => {
    toggleFunction((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Settings Page</Text>
          {/* Settings Gear Icon */}
          <Icon name="setting" style={styles.goldenIcon} />
      </View>
      

      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>

        <View style={styles.toggleItem}>
          <Text style={styles.toggleText}>Notifications</Text>
          <Switch
            trackColor={{ false: '#DEB992', true: '#1BA098' }}
            thumbColor={notifications ? '#DEB992' : '#1BA098'}
            onValueChange={() => toggleSwitch(setNotifications)}
            value={notifications}
          />
        </View>

        <View style={styles.toggleItem}>
          <Text style={styles.toggleText}>Allow Family Members to See Activity</Text>
          <Switch
            trackColor={{ false: '#DEB992', true: '#1BA098' }}
            thumbColor={allowActivity ? '#DEB992' : '#1BA098'}
            onValueChange={() => toggleSwitch(setAllowActivity)}
            value={allowActivity}
          />
        </View>

        <View style={styles.toggleItem}>
          <Text style={styles.toggleText}>Allow Family Members to See Meals</Text>
          <Switch
            trackColor={{ false: '#DEB992', true: '#1BA098' }}
            thumbColor={allowMeals ? '#DEB992' : '#1BA098'}
            onValueChange={() => toggleSwitch(setAllowMeals)}
            value={allowMeals}
          />
        </View>

        <View style={styles.toggleItem}>
          <Text style={styles.toggleText}>Allow Family Members to See Doctors Feedback</Text>
          <Switch
            trackColor={{ false: '#DEB992', true: '#1BA098' }}
            thumbColor={allowDoctorsFeedback ? '#DEB992' : '#1BA098'}
            onValueChange={() => toggleSwitch(setAllowDoctorsFeedback)}
            value={allowDoctorsFeedback}
          />
        </View>

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
          <Icon name="setting" style={styles.specificIcon} />
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
    goldenIcon: {
      color: '#DEB992',
      fontSize: 65,
      paddingTop: 20
    },

    toggleContainer: {
      marginTop: 0,
      paddingRight: 5, // Adjust this value to move the toggle switch to the right
      paddingLeft: 45, // Adjust this value to move the toggle switch to the right
      paddingBottom: 220, // Adjust this value to move the toggle switch to the right
    },
    toggleItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'centre',
      marginVertical: 20, // Adjust this value to control the overall vertical spacing
      paddingHorizontal: 20, // Add horizontal padding to control the distance from the screen edges
      width: -1, // Adjust the width as needed
      paddingLeft: -4, // Adjust this value to move the toggle switch to the right
      paddingRigh: 2, // Adjust this value to move the toggle switch to the right
    },
    toggleText: {
      color: '#DEB992',
      fontSize: 18,
      marginRight: 70, // Adjust this value to increase or decrease the distance
      marginLeft: -15 // Adjust this value to increase or decrease the distance
    },
});