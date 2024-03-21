import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Button from '../components/Button';
import TextField from '../components/TextField';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import textInputStyles from '../components/textInputStyle'; // Import styles from the file
import { SelectList } from 'react-native-dropdown-select-list'

export default function PersonalMetrics({navigation}) {

  const [bloodGlucoseLevel, setBloodGlucoseLevel] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [insulinDosage, setInsulinDosage] = useState('');
  const [mealType, setMealType] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [username, setUsername] = useState('');

  const [mealtypes, setMealTypes] = React.useState("");
  
  const mealtypesData = [
    {key:'1',value:'Breakfast'},
    {key:'2',value:'Lunch'},
    {key:'3',value:'Dinner'},
    {key:'4',value:'Snack'},
  ];

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
  }, []); // Empty dependency array ensures this runs once after the component mounts

  const bloodGlucoseLevelSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/add_blood_glucose_level`, {
        username: username, // Use the username state variable
        bloodGlucoseLevel: bloodGlucoseLevel,
      });
      if (response.data.success) {
        console.log("Blood glucose level updated successfully");
      } 
      else {
        // Update failed
        console.error('Blood glucose level update failed:', response.data.message);
      }

    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      console.error(error.config);
    }
  };

  const weightSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_weight`, {
        username: username, // Use the username state variable
        weight: weight,
      });
      if (response.data.success) {
        console.log("Weight updated successfully");
      } 
      else {
        // Update failed
        console.error('Weight update failed:', response.data.message);
      }

    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      console.error(error.config);
    }
  };

  const heightSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_height`, {
        username: username, // Use the username state variable
        height: height,
      });
      if (response.data.success) {
        console.log("Height updated successfully");
      } 
      else {
        // Update failed
        console.error('Height update failed:', response.data.message);
      }

    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      console.error(error.config);
    }
  };

  const insulinDosageSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_insulin_dosage`, {
        username: username, // Use the username state variable
        insulinDosage: insulinDosage,
      });
      if (response.data.success) {
        console.log("Insulin dosage updated successfully");
      } 
      else {
        // Update failed
        console.error('Insulin dosage update failed:', response.data.message);
      }

    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      console.error(error.config);
    }
  };

  const allergiesSaveChanges = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_allergies`, {
        username: username, // Use the username state variable
        allergies: allergies,
      });
      if (response.data.success) {
        console.log("Allergies updated successfully");
      } 
      else {
        // Update failed
        console.error('Allergies update failed:', response.data.message);
      }

    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      console.error(error.config);
    }
  };

  const mealAdd = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/add_meal/${username}`, {
        meal_type: mealType,
        meal_description: mealDescription
      });
      if (response.data.success) {
        console.log("Meal added successfully");
      } 
      else {
        // Update failed
        console.error('Meal update failed:', response.data.message);
      }

    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      console.error(error.config);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>

      <View style={[styles.container, { marginBottom: -60 }]}>
        <Text style={styles.text}>Personal Metrics Page</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Blood Glucose Level</Text>
          <TextInput
            style={[styles.input, { width: 160 }]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setBloodGlucoseLevel(text)}
            value={bloodGlucoseLevel}
          />
          <Button onPress={() => bloodGlucoseLevelSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
        <Text style={styles.label}>Weight</Text>
          <TextInput
            style={[styles.input, { width: 160 }]} // Manually setting width here
            placeholder="Ex. 55"
            onChangeText={(text) => setWeight(text)}
            value={weight}
          />
          <Button onPress={() => weightSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
        <Text style={styles.label}>Height</Text>
          <TextInput
            style={[styles.input, { width: 160}]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setHeight(text)}
            value={height}
          />
          <Button onPress={() => heightSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.label}>Insulin Dosage</Text>
          <TextInput
            style={[styles.input, { width: 160 }]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setInsulinDosage(text)}
            value={insulinDosage}
          />
          <Button onPress={() => insulinDosageSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
        <Text style={styles.label}>Allergies</Text>
        <TextInput
          style={[styles.input, { width: 160 }]} // Manually setting width here
          placeholder="Ex. 10.6"
          onChangeText={(text) => setAllergies(text)}
          value={allergies}
        />
        <Button onPress={() => allergiesSaveChanges()} title="Save Changes" />
        </View>

        <Text style={styles.label}>Meal Type</Text>
        <View>
        <SelectList 
          setSelected={(val) => setMealType(val)} 
          // fontFamily='lato'
          data={mealtypesData}  
          arrowicon={<Icon name="down" size={12} color={'#DEB992'} />} 
          searchicon={<Icon name="search1" size={12} color={'#DEB992'} />} 
          search={false} 
          boxStyles={{borderRadius:10, borderColor:'#1BA098'}} //override default styles
          inputStyles={{color:'#DEB992'}}
          dropdownTextStyles={{color:'#1BA098'}}
          dropdownStyles={{borderColor:'#1BA098'}}
          defaultOption={{ key:'1', value:'Breakfast' }}   //default selected option
          save="value"
        />
        <Text style={styles.label}>Meal Description</Text>
        <TextInput
          style={[styles.input, { width: 160 }]}
          placeholder="Enter meal description"
          onChangeText={(text) => setMealDescription(text)}
          value={mealDescription}
        />
        <Button onPress={() => mealAdd()} title="Add" />
        </View>

        <Button onPress={() => handleSubmit()} title="Meal Summary" />

        <View style={styles.rowContainer}>
        <Text style={styles.label}>Activity Type</Text>
        <TextInput
        style={[styles.input, { width: 160 }]}
        placeholder="Ex. Walking, Running, Swimming"
        onChangeText={(text) => setInsulinDosage(text)}
        value={insulinDosage}
        />
        <Button onPress={() => handleSubmit()} title="Add" />
        </View>

        <Button onPress={() => handleSubmit()} title="Activity Summary" />
      
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
        <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.iconButton}>
          <Icon name="setting" style={styles.icon} />
        </TouchableOpacity>

      </View>

    
    </View>
    </ScrollView>
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
        justifyContent: 'center', // Align icons to the bottom
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
    },
    formContainer: {
      flex: 1,
      flexDirection: 'column', // Arrange items horizontally
      //width: '100%', // Set the width to 100% to take up the full width
      justifyContent: 'space-evenly', // Center the content vertically
      alignItems: 'center',
    },
    rowContainer: {
      flexDirection: 'row', // Arrange items horizontally
      alignItems: 'center', // Align items vertically in the center
      justifyContent: 'space-evenly', // Align items horizontally in the center
    },

    input: {
      borderWidth: 1,
      borderColor: '#1BA098',
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      color: '#DEB992',
    },

    label: {
      marginRight: 10,
      color: '#DEB992',
      fontSize: 15,
      marginBottom: 4,
    },

    placeholder: {
      color: '#DEB992',
    },
    picker: {
      borderWidth: 1,
      borderColor: '#1BA098',
      borderRadius: 3,
      padding: 10,
      fontSize: 3,
      color: '#DEB992',
    }

});