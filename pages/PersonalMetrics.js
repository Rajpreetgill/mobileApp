import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
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
  const [carbIntake, setCarbIntake] = useState('');


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
          setPhysicalActivity(userData.physical_activity);
          setActivityIntensity(userData.activity_intensity);
          setActivityDuration(userData.activity_duration);
          setStressLevel(userData.stress_level);
          setIllness(userData.illness);
          setHormonalChanges(userData.hormonal_changes);
          setAlcoholConsumption(userData.alcohol_consumption);
          setMedication(userData.medication);
          setMedicationDosage(userData.medication_dosage);
          setWeatherConditions(userData.weather_conditions);

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("MainPage")} style={styles.iconButton}>
        <Icon name="arrowleft" style={styles.backIcon} />
        </TouchableOpacity>
        
        <Text style={styles.text}>Personal Metrics</Text>

        <TouchableOpacity onPress={() => navigation.navigate("PersonalMetricsEdit")} style={styles.iconButton}>
        <Icon name="edit" style={styles.editIcon} />
        </TouchableOpacity>
    </View>

    <View style={styles.bodyContainer}>
      {/* Blood glucose level */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Blood Glucose Level</Text>
        <TextInput
          style={styles.input}
          value={bloodGlucoseLevel + ' mg/dl'}
          onChangeText={(text) => setName(text)}
        />
      </View>

      {/* Weight */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          value={weight + ' lbs'}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      {/* Height */}
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Height</Text>
        <TextInput
        style={styles.input}
        value={height + ' ft'}
        onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      {/* Insulin Type */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Insulin Type</Text>
        <TextInput
          style={styles.input}
          value={insulinType}
          onChangeText={(text) => setDateOfBirth(text)}
        />
      </View>

      {/* Insulin dosage */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Insulin Dosage</Text>
        <TextInput
          style={styles.input}
          value={insulinDosage + ' mg/dl'}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      {/* Allergies */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Allergies</Text>
        <TextInput
          style={styles.input}
          value={allergies}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      {/* Physical Activity */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Physical Activity</Text>
        <TextInput
          style={styles.input}
          value={physicalActivity}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      {/* Activity Intensity */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Activity Intensity</Text>
        <TextInput
          style={styles.input}
          value={activityIntensity}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      {/* Activity Duration */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Activity Duration</Text>
        <TextInput
          style={styles.input}
          value={activityDuration + ' minutes'}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      {/* Stress Level */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Stress Level</Text>
        <TextInput
          style={styles.input}
          value={stressLevel}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      {/* Illness */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Illness</Text>
        <TextInput
          style={styles.input}
          value={illness}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      {/* Hormonal Changes */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hormonal Changes</Text>
        <TextInput
          style={styles.input}
          value={hormonalChanges}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      {/* Alcohol Consumption */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Alcohol Consumption</Text>
        <TextInput
          style={styles.input}
          value={alcoholConsumption}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      {/* Medication */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Medication</Text>
        <TextInput
          style={styles.input}
          value={medication}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      {/* Medication Dosage */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Medication  Dosage</Text>
        <TextInput
          style={styles.input}
          value={medicationDosage + ' mg'}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      {/* Weather Conditions */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weather Conditions</Text>
        <TextInput
          style={styles.input}
          value={weatherConditions}
          onChangeText={(text) => setEmergencyContact(text)}
        />
      </View>

      {/* <Button onPress={() => handleSubmit()} title="Meal Summary" />

      <Button onPress={() => handleSubmit()} title="Activity Summary" /> */}

      </View>

      </ScrollView>

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
  );

}

const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: '#051622',
      alignItems: 'flex-start',
      paddingTop: 10, // Add padding to the top
      paddingBottom: 10, // Add padding to the bottom
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
        fontSize: 29,
        fontWeight: 'bold',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        alignContent: 'center',
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom : 10,
        backgroundColor: '#1B2130',
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'baseline',
        justifyContent: 'center',
        alignContent: 'center',
        paddingLeft: 50,
        paddingTop: 20,
        width: '100%',
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
        fontSize: 18,
    },
    inputContainer: {
        marginVertical: 10,
        width: '80%',
    },
    label: {
        color: '#DEB992',
        fontSize: 20,
        marginBottom: 5,
    },
    editIcon: {
        color: '#DEB992',
        borderColor: '#DEB992',
        fontSize: 30,
    },
    backIcon: {
        color: '#DEB992',
        fontSize: 30,
    },

});