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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function PersonalMetricsEdit({navigation}) {

  const [bloodGlucoseLevel, setBloodGlucoseLevel] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [insulinDosage, setInsulinDosage] = useState('');
  const [mealType, setMealType] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [username, setUsername] = useState('');

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
  const [fingerStickValue, setFingerStickValue] = useState('');
  const [basalValue, setBasalValue] = useState('');
  const [basisGsrValue, setBasisGsrValue] = useState('');
  const [basisSkinTemperatureValue, setBasisSkinTemperatureValue] = useState('');
  const [bolusDose, setBolusDose] = useState('');
  
  const mealtypesData = [
    {key:'1',value:'Breakfast'},
    {key:'2',value:'Lunch'},
    {key:'3',value:'Dinner'},
    {key:'4',value:'Snack'},
  ];

  const activityTypesData = [
    {key:'1',value:'Walking'},
    {key:'2',value:'Running'},
    {key:'3',value:'Cycling'},
    {key:'4',value:'Swimming'},
    {key:'5',value:'None'},
  ];

  const levelData = [
    {key:'1',value:'Low'},
    {key:'2',value:'Moderate'},
    {key:'3',value:'High'},
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

  const fingerStickValueSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_finger_stick_value`, {
        username: username, // Use the username state variable
        finger_stick_value: fingerStickValue,
      });
      if (response.data.success) {
        console.log("finger_stick_value updated successfully");
      } 
      else {
        // Update failed
        console.error('finger_stick_value update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
      console.error(error.config);
    }
  };

  const basalValueSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_basal_value`, {
        username: username, // Use the username state variable
        basal_value: basalValue,
      });
      if (response.data.success) {
        console.log("basal_value updated successfully");
      } 
      else {
        // Update failed
        console.error('basal_value update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };

  const basisGsrValueSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_basis_gsr_value`, {
        username: username, // Use the username state variable
        basis_gsr_value: basisGsrValue,
      });
      if (response.data.success) {
        console.log("basis_gsr_value updated successfully");
      } 
      else {
        // Update failed
        console.error('basis_gsr_value update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };

  const basisSkinTemperatureValueSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_basis_skin_temperature_value`, {
        username: username, // Use the username state variable
        basis_skin_temperature_value: basisSkinTemperatureValue,
      });
      if (response.data.success) {
        console.log("basis_skin_temperature_value updated successfully");
      } 
      else {
        // Update failed
        console.error('basis_skin_temperature_value update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };

  const bolusDoseSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_bolus_dose`, {
        username: username, // Use the username state variable
        bolus_dose: bolusDose,
      });
      if (response.data.success) {
        console.log("bolus_dose updated successfully");
      } 
      else {
        // Update failed
        console.error('bolus_dose update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
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

  const insulinTypeSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_insulin_type`, {
        username: username, // Use the username state variable
        insulin_type: insulinType,
      });
      if (response.data.success) {
        console.log("Insulin type updated successfully");
      } 
      else {
        // Update failed
        console.error('Insulin type update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
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

  const allergiesSubmit = async (e) => {
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
      console.error('Error: ', error.message);
      console.error(error.config);
    }
  };

  const physicalActivitySubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      console.log("physicalActivityData: ", physicalActivity);
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_physical_activity`, {
        username: username, // Use the username state variable
        physical_activity: physicalActivity,
      });
      if (response.data.success) {
        console.log("Physical activity updated successfully");
      } 
      else {
        // Update failed
        console.error('Physical Activity update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
      console.error(error.config);
    }
  };

  const activityIntensitySubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_activity_intensity`, {
        username: username, // Use the username state variable
        activity_intensity: activityIntensity,
      });
      if (response.data.success) {
        console.log("Activity intensity updated successfully");
      } 
      else {
        // Update failed
        console.error('Activity intensity update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
      console.error(error.config);
    }
  };

  const activityDurationSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_activity_duration`, {
        username: username, // Use the username state variable
        activity_duration: activityDuration,
      });
      if (response.data.success) {
        console.log("Activity duration updated successfully");
      } 
      else {
        // Update failed
        console.error('Activity duration update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
      console.error(error.config);
    }
  };

  const stressLevelSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_stress_level`, {
        username: username, // Use the username state variable
        stress_level: stressLevel,
      });
      if (response.data.success) {
        console.log("Stress level updated successfully");
      } 
      else {
        // Update failed
        console.error('Stress level update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
      console.error(error.config);
    }
  };

  const illnessSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_illness`, {
        username: username, // Use the username state variable
        illness: illness,
      });
      if (response.data.success) {
        console.log("Illness updated successfully");
      } 
      else {
        // Update failed
        console.error('Illness update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
      console.error(error.config);
    }
  };

  const hormonalChangesSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_hormonal_changes`, {
        username: username, // Use the username state variable
        hormonal_changes: hormonalChanges,
      });
      if (response.data.success) {
        console.log("Hormonal changes updated successfully");
      } 
      else {
        // Update failed
        console.error('Hormonal changes update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
      console.error(error.config);
    }
  };

  const alcoholConsumptionSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_alcohol_consumption`, {
        username: username, // Use the username state variable
        alcohol_consumption: alcoholConsumption,
      });
      if (response.data.success) {
        console.log("Alcohol consumption updated successfully");
      } 
      else {
        // Update failed
        console.error('Alcohol consumption update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
      console.error(error.config);
    }
  };

  const medicationSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_medication`, {
        username: username, // Use the username state variable
        medication: medication,
      });
      if (response.data.success) {
        console.log("Medication updated successfully");
      } 
      else {
        // Update failed
        console.error('Medication update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
      console.error(error.config);
    }
  };

  const medicationDosageSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_medication_dosage`, {
        username: username, // Use the username state variable
        medication_dosage: medicationDosage,
      });
      if (response.data.success) {
        console.log("Medication dosage updated successfully");
      } 
      else {
        // Update failed
        console.error('Medication dosage update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
      console.error(error.config);
    }
  };

  const weatherConditionsSubmit = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/update_weather_conditions`, {
        username: username, // Use the username state variable
        weather_conditions: weatherConditions,
      });
      if (response.data.success) {
        console.log("Weather conditions updated successfully");
      } 
      else {
        // Update failed
        console.error('Weather conditions update failed:', response.data.message);
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
      console.error(error.config);
    }
  };

  const mealAdd = async (e) => {
    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/add_meal/${username}`, {
        meal_type: mealType,
        meal_description: mealDescription,
        carbohydrate_intake: carbIntake
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
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("PersonalMetrics")} style={styles.iconButton}>
        <Icon name="arrowleft" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.text}>Edit Personal Metrics</Text>
    </View>

    <View style={styles.bodyContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Blood Glucose Level</Text>
          <TextInput
            style={[styles.input, { width: 230 }]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setBloodGlucoseLevel(text)}
            value={bloodGlucoseLevel}
          />
          </View>
          <Button onPress={() => bloodGlucoseLevelSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Finger Stick Value</Text>
          <TextInput
            style={[styles.input, { width: 230 }]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setFingerStickValue(text)}
            value={fingerStickValue}
          />
          </View>
          <Button onPress={() => fingerStickValueSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Basal Value</Text>
          <TextInput
            style={[styles.input, { width: 230 }]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setBasalValue(text)}
            value={basalValue}
          />
          </View>
          <Button onPress={() => basalValueSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Basis Gsr Value</Text>
          <TextInput
            style={[styles.input, { width: 230 }]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setBasisGsrValue(text)}
            value={basisGsrValue}
          />
          </View>
          <Button onPress={() => basisGsrValueSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Basis Skin Temperature</Text>
          <TextInput
            style={[styles.input, { width: 230 }]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setBasisSkinTemperatureValue(text)}
            value={basisSkinTemperatureValue}
          />
          </View>
          <Button onPress={() => basisSkinTemperatureValueSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Bolus Dose</Text>
          <TextInput
            style={[styles.input, { width: 230 }]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setBolusDose(text)}
            value={bolusDose}
          />
          </View>
          <Button onPress={() => bolusDoseSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={[styles.input, { width: 230 }]} // Manually setting width here
            placeholder="Ex. 55"
            onChangeText={(text) => setWeight(text)}
            value={weight}
          />
          </View>
          <Button onPress={() => weightSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height</Text>
          <TextInput
            style={[styles.input, { width: 230}]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setHeight(text)}
            value={height}
          />
          </View>
          <Button onPress={() => heightSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Insulin Type</Text>
          <TextInput
            style={[styles.input, { width: 230 }]}
            placeholder="Enter insulin type"
            onChangeText={(text) => setInsulinType(text)}
            value={insulinType}
          />
          </View>
          <Button onPress={() => insulinTypeSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Insulin Dosage</Text>
          <TextInput
            style={[styles.input, { width: 230 }]} // Manually setting width here
            placeholder="Ex. 10.6"
            onChangeText={(text) => setInsulinDosage(text)}
            value={insulinDosage}
          />
          </View>
          <Button onPress={() => insulinDosageSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Allergies</Text>
        <TextInput
          style={[styles.input, { width: 230 }]} // Manually setting width here
          placeholder="Ex. 10.6"
          onChangeText={(text) => setAllergies(text)}
          value={allergies}
        />
        </View>
        <Button onPress={() => allergiesSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Physical Activity</Text>
          <SelectList 
            setSelected={(value) => setPhysicalActivity(value)} 
            // fontFamily='lato'
            data={activityTypesData}  
            arrowicon={<Icon name="down" size={12} color={'#DEB992'} />} 
            searchicon={<Icon name="search1" size={12} color={'#DEB992'} />} 
            search={false} 
            boxStyles={{borderRadius:10, borderColor:'#1BA098', width:230}} //override default styles
            inputStyles={{color:'#DEB992'}}
            dropdownTextStyles={{color:'#1BA098'}}
            dropdownStyles={{borderColor:'#1BA098'}}
            defaultOption={activityTypesData[0]}   //default selected option
            save="value"
          />
          </View>
        <Button onPress={() => physicalActivitySubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Activity Intensity</Text>
          <SelectList 
            setSelected={(val) => setActivityIntensity(val)} 
            // fontFamily='lato'
            data={levelData}  
            arrowicon={<Icon name="down" size={12} color={'#DEB992'} />} 
            searchicon={<Icon name="search1" size={12} color={'#DEB992'} />} 
            search={false} 
            boxStyles={{borderRadius:10, borderColor:'#1BA098', width:230}} //override default styles
            inputStyles={{color:'#DEB992'}}
            dropdownTextStyles={{color:'#1BA098'}}
            dropdownStyles={{borderColor:'#1BA098'}}
            defaultOption={{ key:'1', value:'Low' }}   //default selected option
            save="value"
          />
          </View>
          <Button onPress={() => activityIntensitySubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Activity Duration (min)</Text>
          <TextInput
            style={[styles.input, { width: 230 }]}
            placeholder="Enter activity duration"
            onChangeText={(text) => setActivityDuration(text)}
            value={activityDuration}
          />
          </View>
          <Button onPress={() => activityDurationSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Stress Level</Text>
          <SelectList 
            setSelected={(val) => setStressLevel(val)} 
            // fontFamily='lato'
            data={levelData}  
            arrowicon={<Icon name="down" size={12} color={'#DEB992'} />} 
            searchicon={<Icon name="search1" size={12} color={'#DEB992'} />} 
            search={false} 
            boxStyles={{borderRadius:10, borderColor:'#1BA098', width:230}} //override default styles
            inputStyles={{color:'#DEB992'}}
            dropdownTextStyles={{color:'#1BA098'}}
            dropdownStyles={{borderColor:'#1BA098'}}
            defaultOption={{ key:'1', value:'Low' }}   //default selected option
            save="value"
          />
          </View>
          <Button onPress={() => stressLevelSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Illness</Text>
          <TextInput
            style={[styles.input, { width: 230 }]}
            placeholder="Enter illness"
            onChangeText={(text) => setIllness(text)}
            value={illness}
          />
          </View>
          <Button onPress={() => illnessSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Hormonal Changes</Text>
          <TextInput
            style={[styles.input, { width: 230 }]}
            placeholder="Enter hormonal changes"
            onChangeText={(text) => setHormonalChanges(text)}
            value={hormonalChanges}
          />
          </View>
          <Button onPress={() => hormonalChangesSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Alcohol Consumption</Text>
          <TextInput
            style={[styles.input, { width: 230 }]}
            placeholder="Enter alcohol consumption"
            onChangeText={(text) => setAlcoholConsumption(text)}
            value={alcoholConsumption}
          />
          </View>
          <Button onPress={() => alcoholConsumptionSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Medication</Text>
          <TextInput
            style={[styles.input, { width: 230 }]}
            placeholder="Enter medication"
            onChangeText={(text) => setMedication(text)}
            value={medication}
          />
          </View>
          <Button onPress={() => medicationSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Medication Dosage</Text>
          <TextInput
            style={[styles.input, { width: 230 }]}
            placeholder="Enter medication dosage"
            onChangeText={(text) => setMedicationDosage(text)}
            value={medicationDosage}
          />
          </View>
          <Button onPress={() => medicationDosageSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Weather Conditions</Text>
          <TextInput
            style={[styles.input, { width: 230 }]}
            placeholder="Enter weather conditions"
            onChangeText={(text) => setWeatherConditions(text)}
            value={weatherConditions}
          />
          </View>
          <Button onPress={() => weatherConditionsSubmit()} title="Submit" />
        </View>

        <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Meal Type</Text>
        <SelectList 
          setSelected={(val) => setMealType(val)} 
          // fontFamily='lato'
          data={mealtypesData}  
          arrowicon={<Icon name="down" size={12} color={'#DEB992'} />} 
          searchicon={<Icon name="search1" size={12} color={'#DEB992'} />} 
          search={false} 
          boxStyles={{borderRadius:10, borderColor:'#1BA098', width:230}} //override default styles
          inputStyles={{color:'#DEB992'}}
          dropdownTextStyles={{color:'#1BA098'}}
          dropdownStyles={{borderColor:'#1BA098'}}
          defaultOption={{ key:'1', value:'Breakfast' }}   //default selected option
          save="value"
        />
        </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Carbohydrate Intake (g)</Text>
          <TextInput
            style={[styles.input, { width: 230 }]}
            placeholder="Enter carbohydrate intake"
            onChangeText={(text) => setCarbIntake(text)}
            value={carbIntake}
          />
          </View>
        </View>

        <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Meal Description</Text>
        <TextInput
          style={[styles.input, { width: 230 }]}
          placeholder="Enter meal description"
          onChangeText={(text) => setMealDescription(text)}
          value={mealDescription}
        />
        </View>
        <Button onPress={() => mealAdd()} title="Add" />
        </View>
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
    fontSize: 29,
    fontWeight: 'bold',
  },
  titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center',
      alignContent: 'center',
      paddingRight: 30,
      paddingTop: 10,
      paddingBottom : 10,
      backgroundColor: '#1B2130',
      width: '100%',
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
    inputContainer: {
      marginBottom: 25,
      alignItems: 'flex-start',
      justifyContent: 'space-around',
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
    rowContainer: {
      flexDirection: 'row', // Arrange items horizontally
      alignItems: 'center', // Align items vertically in the center
      justifyContent: 'space-between', // Align items horizontally in the center
      width: '40%',
      marginTop: 20,
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
    label: {
      color: '#DEB992',
      fontSize: 18,
      marginBottom: 5,
  },
    placeholder: {
      color: '#DEB992',
    },
    picker: {
      borderWidth: 1,
      borderColor: '#1BA098',
      borderRadius: 3,
      // padding: 10,
      fontSize: 3,
      color: '#DEB992',
      size: 10,
    },
    backIcon: {
      color: '#DEB992',
      fontSize: 30,
  },

});