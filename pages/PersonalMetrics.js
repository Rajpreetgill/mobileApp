import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PersonalMetrics({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [username, setUsername] = useState('');

  const [bloodGlucoseLevel, setBloodGlucoseLevel] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [insulinDosage, setInsulinDosage] = useState('');
  const [mealType, setMealType] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [mealtypes, setMealTypes] = React.useState("");

  // Add states for new fields
  const [insulinType, setInsulinType] = useState('');
  const [physicalActivity, setPhysicalActivity] = useState('');
  const [activityIntensity, setActivityIntensity] = useState('');
  const [activityDuration, setActivityDuration] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [illness, setIllness] = useState('');
  const [hormonalChanges, setHormonalChanges] = useState('');
  const [alcoholConsumption, setAlcoholConsumption] = useState('');
  const [medication, setMedication] = useState('');
  const [medicationDosage, setMedicationDosage] = useState('');
  const [weatherConditions, setWeatherConditions] = useState('');
  const [carbIntake, setCarbIntake] = useState('');

  
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const username = await AsyncStorage.getItem('curr_username');
          setUsername(username);
          getPersonalMetricsData(username); // You can call getProfileData here
        } catch (e) {
          // Handle errors here
          console.error("Error retrieving data", e);
        }
      };
      fetchData();
      console.log("This was run!");
    }, [getPersonalMetricsData]) // Add getProfileData to the dependency array
  );
  

  const getPersonalMetricsData = async (username) => {
    try {
      const response = await axios.get(`https://i-sole-backend.com/get_personal_metrics/${username}`);
      if (response.data.success) {
          // console.log("Retrieved profile data successfully:", response.data);
          // Do something with the retrieved profile data
          const userData = response.data.data;
          setBloodGlucoseLevel(userData.blood_glucose_level);
          setWeight(userData.weight);
          setHeight(userData.height);
          setInsulinType(userData.insulin_type);
          setInsulinDosage(userData.insulin_dosage);
          setAllergies(userData.allergies);
          setStressLevel(userData.stress_level);

      } else {
          // Update failed
          console.error('personal metrics retrieval failed:', response.data.message);
      }
    } catch (error) {
        console.error('Error retrieving personal metrics:', error);
    }
  }


  return (
    <View style={styles.container}>

    <View style={styles.backContainer}> 
      <TouchableOpacity onPress={() => navigation.navigate("MainPage")} style={styles.iconButton}>
      <Icon name="left" style={styles.goldenIcon} />
      <Text style={styles.goldenIconText}>Main Page</Text>
      </TouchableOpacity>
    </View>

      <View style={styles.iconContainer}>
      <Text style={styles.text}>Personal Metrics</Text>
        {/* Golden Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("PersonalMetricsEdit")} style={styles.iconButton}>
        <Text style={styles.goldenIconText}>Edit</Text>
          <Icon name="edit" style={styles.goldenIcon} />
        </TouchableOpacity>
      </View>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Blood Glucose Level</Text>
        <TextInput
          style={styles.input}
          value={bloodGlucoseLevel + ' mg/dl'}
          onChangeText={(text) => setName(text)}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          value={weight + ' lbs'}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      {/* Phone Number Input */}
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Height</Text>
        <TextInput
        style={styles.input}
        value={height + ' ft'}
        onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      {/* Date of Birth Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Insulin Type</Text>
        <TextInput
          style={styles.input}
          value={insulinType}
          onChangeText={(text) => setDateOfBirth(text)}
        />
      </View>

      {/* Emergency Contact Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Insulin Dosage</Text>
        <TextInput
          style={styles.input}
          value={insulinDosage + ' mg/dl'}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Stress Level</Text>
        <TextInput
          style={styles.input}
          value={stressLevel}
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
    paddingTop: 35, // Add padding to the top
    paddingBottom: 10, // Add padding to the bottom
  },
  text: {
      color: '#DEB992',
      fontSize: 40,
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