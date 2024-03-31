import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch } from 'react-native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


export default function Settings({navigation}) {
  const [notifications, setNotifications] = useState(false);
  const [allowActivity, setAllowActivity] = useState(false);
  const [allowMeals, setAllowMeals] = useState(false);
  const [allowFeedback, setAllowFeedback] = useState(false);
  const [username, setUsername] = useState('');

 

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const username = await AsyncStorage.getItem('curr_username');
          setUsername(username);
          getSettingsData(username); // You can call getProfileData here
        } catch (e) {
          // Handle errors here
          console.error("Error retrieving data", e);
        }
      };
      fetchData();
      console.log("Fetch notification:", notifications);
    }, [getSettingsData]) 
  );

  const getSettingsData = async (username) => {
    try {
      const response = await axios.get(`https://i-sole-backend.com/get_profile_data/${username}`);
      if (response.data.success) {
          // Do something with the retrieved profile data
          const userData = response.data.data;
          if(userData.notifications != null)
          {
            setNotifications(userData.notifications);
          }
          if(userData.view_activity != null)
          {
            setAllowActivity(userData.view_activity);
          }
          if(userData.view_meals != null)
          {
            setAllowMeals(userData.view_meals);
          }
          if(userData.view_feedback != null)
          {
            setAllowFeedback(userData.view_feedback);
          }

      } else {
          // Update failed
          console.error('Profile data retrieval failed:', response.data.message);
      }
    } catch (error) {
        //console.error('Error retrieving profile data:', error);
    }
  }

  const toggleNotificationSwitch = async () => {
    try {
      const response = await axios.post('https://i-sole-backend.com/update_notifications', {
        username: username,
        value: !notifications
      });
      if(response.data.success)
      {
        console.log('Successfully updated notifications!');
      }
      else
      {
        console.log("Error updating notifications: ", response.data.message);
      }
    } catch (error) {
      console.error('Error setting notifications:', error);
    }
    setNotifications((prevState) => !prevState);
  };

  const toggleViewActivitySwitch = async () => {
    try {
      const response = await axios.post('https://i-sole-backend.com/update_view_activity', {
        username: username,
        value: !allowActivity
      });
      if(response.data.success)
      {
        console.log('Successfully updated allow activity!');
      }
      else
      {
        console.log("Error updating allow activity: ", response.data.message);
      }
    } catch (error) {
      console.error('Error setting allow activity:', error);
    }
    setAllowActivity((prevState) => !prevState);
  };

  const toggleViewMealsSwitch = async () => {
    try {
      const response = await axios.post('https://i-sole-backend.com/update_view_meals', {
        username: username,
        value: !allowMeals
      });
      if(response.data.success)
      {
        console.log('Successfully updated allow meals!');
      }
      else
      {
        console.log("Error updating allow meals: ", response.data.message);
      }
    } catch (error) {
      console.error('Error setting allow meals:', error);
    }
    setAllowMeals((prevState) => !prevState);
  };

  const toggleViewFeedbackSwitch = async () => {
    try {
      const response = await axios.post('https://i-sole-backend.com/update_view_feedback', {
        username: username,
        value: !allowFeedback
      });
      if(response.data.success)
      {
        console.log('Successfully updated allow feedback!');
      }
      else
      {
        console.log("Error updating allow feedback: ", response.data.message);
      }
    } catch (error) {
      console.error('Error setting allow feedback:', error);
    }
    setAllowFeedback((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Settings</Text>
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
            onValueChange={toggleNotificationSwitch}
            value={notifications}
          />
        </View>

        <View style={styles.toggleItem}>
          <Text style={styles.toggleText}>Allow Family Members to See Activity</Text>
          <Switch
            trackColor={{ false: '#DEB992', true: '#1BA098' }}
            thumbColor={allowActivity ? '#DEB992' : '#1BA098'}
            onValueChange={toggleViewActivitySwitch}
            value={allowActivity}
          />
        </View>

        <View style={styles.toggleItem}>
          <Text style={styles.toggleText}>Allow Family Members to See Meals</Text>
          <Switch
            trackColor={{ false: '#DEB992', true: '#1BA098' }}
            thumbColor={allowMeals ? '#DEB992' : '#1BA098'}
            onValueChange={toggleViewMealsSwitch}
            value={allowMeals}
          />
        </View>

        <View style={styles.toggleItem}>
          <Text style={styles.toggleText}>Allow Family Members to See Doctors Feedback</Text>
          <Switch
            trackColor={{ false: '#DEB992', true: '#1BA098' }}
            thumbColor={allowFeedback ? '#DEB992' : '#1BA098'}
            onValueChange={toggleViewFeedbackSwitch}
            value={allowFeedback}
          />
        </View>

        </View>

      <View style={styles.iconContainerBottom}>
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
      fontSize: 35,
      fontWeight: 'bold',
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
      marginLeft: -15, // Adjust this value to increase or decrease the distance
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
      marginLeft: 30,
  },
});