import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
  
  export default function BloodGlucoseAnalytics({navigation}) {
    const [selectedView, setSelectedView] = useState('day');
    const [sweatGlucose, setSweatGlucose] = useState('');
    var [bloodGlucose, setBloodGlucoseLevel] = useState('');
    var [predictedHypoglycemia, setPredictedHypoglycemia] = useState('');
    var [predictedHyperglycemia, setPredictedHyperglycemia] = useState('');
    var [personalMetricsData, setPersonalMetricsData] = useState([]);
    const [dailyGlucoseGraph, setDailyGlucoseGraph] = useState('');
    const [username, setUsername] = useState('');
    const [graphTitle, setGraphTitle] = useState('');
    
    const [predictionImage, setPredictionImage] = useState(null);
    const [predictionState, setPredictionState] = useState('');
    const [predictionTime, setPredictionTime] = useState('');

    const [basalValue, setBasalValue] = useState('-');
    const [bolusDose, setBolusDose] = useState('-');
    const [basisGsrValue, setBasisGsrValue] = useState('-');
    const [basisSkinTemperatureValue, setBasisSkinTemperatureValue] = useState('-');
    const [fingerStickValue, setFingerStickValue] = useState('-');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const username = await AsyncStorage.getItem('curr_username');
          setUsername(username)

          setGraphName();
          // Get latest sweat glucose and blood glucose
          if(username != '')
          {
            try {
              // console.log("Username check: ", username);
              const response = await axios.post(`https://i-sole-backend.com/get_latest_glucose_new/${username}`);
              if (response.data.success) 
              {
                console.log(response.data.sweat_glucose);
                console.log(response.data.blood_glucose);
                setSweatGlucose(response.data.sweat_glucose);
                setBloodGlucoseLevel(response.data.blood_glucose);
              } else {
                console.error('Sweat glucose retrieval failed:', response.data.message);
              }
            } catch (error) {
              console.error('Error fetching latest sweat glucose:', error.message);
            }
             var time = new Date();
            //  const hours = now.getHours();
            //  const minutes = now.getMinutes();
            //  const seconds = now.getSeconds();
            // setCurrentTime(`${hours}:${minutes}:${seconds}`);
            setPredictionState('hyperglycemia');
            setPredictedHyperglycemia("High Risk - " + time.toLocaleDateString() + ' 4:50 PM');
            setPredictedHypoglycemia("Low Risk");
            
            // === Important Dont remove ==//
            // ==== This code shows the updated Daily Prediction Graph if the endpoint is deployed ===//
            // Get personal metrics data
            // try {
            //   const response = await axios.post(`https://i-sole-backend.com/get_personal_metrics/${username}`);
            //   if (response.data.success) 
            //   {
            //     const metrics = response.data.data.get();
            //     setPersonalMetricsData(metrics);
            //     // console.log(personalMetricsData);
            //   } else {
            //     console.error('Personal metrics retrieval failed:', response.data.message);
            //   }
            // } catch (error) {
            //   console.error('Error fetching personal metrics:', error);
            // }

            // // Get Graph and Prediction Data
            // // Define the request payload
            // const requestData = {
            //   "input_data": {
            //     "glucose_level_value": bloodGlucose, 
            //     "finger_stick_value": personalMetricsData.fingerStickValue, 
            //     "basal_value": personalMetricsData.basalValue, 
            //     "basis_gsr_value": personalMetricsData.basisGsrValue, 
            //     "basis_skin_temperature_value": personalMetricsData.basisSkinTemperatureValue, 
            //     "bolus_dose": personalMetricsData.bolusDose
            //   }, 
            //   "hyperglycemia_threshold": 180, 
            //   "hypoglycemia_threshold": 100
            // };
                
            // // Make a POST request to the server endpoint using the `requestData` object as the data payload
            // // Make a POST request to the API
            // console.log(requestData);

            // try {
            //   const response = await axios.post('https://i-sole-backend.com/plot-prediction', requestData);
              
            //   // Extract image data and additional headers from the response
            //   const image = response.data.image;
            //   const state = response.data.prediction_state;
            //   const time = response.data.prediction_time;

            //   const imageUrl = `data:image/png;base64,${image}`;
              
            //   // Set the image data and additional information to state
            //   setPredictionImage(imageUrl);
            //   setPredictionState(state);
            //   setPredictionTime(time);

            //   if(state == 'hyperglycemia')
            //   {
            //     setPredictedHyperglycemia("High Risk - " + time);
            //     setPredictedHypoglycemia("Low Risk");
            //   }
            //   if(state == 'hypoglycemia')
            //   {
            //     setPredictedHyperglycemia("Low Risk");
            //     setPredictedHypoglycemia("High Risk - " + time);
            //   }
            //   if(state == 'normal')
            //   {
            //     setPredictedHyperglycemia("Low Risk - " + time);
            //     setPredictedHypoglycemia("Low Risk - " + time);
            //   }

            //   console.log(state);
            //   console.log(time);
            //   console.log(predictedHyperglycemia);
            //   console.log(predictedHypoglycemia);
            //   // console.log(predictionImage);
              
            // } catch (error) {
            //   console.error('Error fetching graph data:', error);
            // }
            // ==== Important Dont remove ==//
          }

          } catch (e) {
            // Handle errors here
            console.error("Error retrieving data", e);
          }
        
      };
        
      const getBloodGlucoseLevel = async () => {
        if (username != '')
        {
          try {
            if(username != null)
            {
              const response = await axios.get(`https://i-sole-backend.com/get_blood_glucose_level/${username}`);
              if (response.data.success) {
                  const glucoseData = response.data.data;
                  console.log(glucoseData.blood_glucose_leve);
                  setBloodGlucoseLevel(glucoseData.blood_glucose_level);
              } else {
                  // Update failed
                  console.error('Blood Glucose Level retrieval failed:', response.data.message);
              }
            }
          } catch (error) {
              console.error('Error retrieving blood glucose level:', error);
              console.error('Error retrieving blood glucose level:', error.message);
          }
        }
      }

      const getPredictedHypoglycemia = async () => {
        if (username != '')
        {
          try {
            if(username != null)
            {
              const response = await axios.get(`https://i-sole-backend.com/get_predicted_hypoglycemia/${username}`);
              if (response.data.success) {
                  const glucoseData = response.data.data;
                  console.log(glucoseData.predicted_hypoglycemia);
                  setPredictedHypoglycemia(glucoseData.predicted_hypoglycemia);
              } else {
                  // Update failed
                  console.error('Predcited Hypoglycemia retrieval failed:', response.data.message);
              }
            }
          } catch (error) {
              console.error('Error retrieving predicted hypoglycemia:', error);
          }
        }
      }

      const getPredictedHyperglycemia = async () => {
        if (username != '')
        {
          try {
            if(username != null)
            {
              const response = await axios.get(`https://i-sole-backend.com/get_predicted_hyperglycemia/${username}`);
              if (response.data.success) {
                  const glucoseData = response.data.data;
                  console.log(glucoseData.predicted_hyperglycemia);
                  setPredictedHyperglycemia(glucoseData.predicted_hyperglycemia);
              } else {
                  // Update failed
                  console.error('Predcited Hyperglycemia retrieval failed:', response.data.message);
              }
            }
          } catch (error) {
              console.error('Error retrieving predicted hyperglycemia:', error);
          }
        }
      }

      fetchData();
      // getBloodGlucoseLevel();
      // getPredictedHypoglycemia();
      // getPredictedHyperglycemia();
    }, [selectedView]); // Empty dependency array ensures this runs once after the component mounts

    const getImageSource = () => {
      // Depending on the selected period, return the appropriate image source
      if (selectedView === 'week') {
        return require('../images/WeeklyBloodGlucoseGraph.png'); // Local file path for week
      } 
      else if (selectedView === 'month') {
        return require('../images/MonthlyBloodGlucoseGraph.png'); // Local file path for month
      } 
      else {
        // return {uri: predictionImage}; // URL for day
        return require('../images/DailyBloodGlucoseGraph.png'); // Local file path for day
      }
    };

    const setGraphName = () => {
      switch (selectedView) {
        case 'day':
          setGraphTitle('Daily Blood Glucose Values with Prediction vs Time');
          break;
        case 'week':
          setGraphTitle('Weekly Blood Glucose Values vs Time');
          break;
        case 'month':
          setGraphTitle('Monthly Blood Glucose Values vs Time');
          break;
      }
    }
  
    return (
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
      <View style={styles.titleContainer}>
      <Text style={styles.text}>Blood Glucose Analytics</Text>
      </View>


       {/* Graph Image */}
       <View style={styles.graphContainer}>
        <View style={styles.graphBox}>
        <Text style={styles.graphTitleText}>{graphTitle}</Text>
          <Image
            source= {getImageSource()}
            style={styles.image}
          />
        </View>
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
              style={[styles.toggleButton, selectedView === 'day' && styles.selectedToggle]}
              onPress={() => setSelectedView('day')}>
            <Text style={styles.toggleText}>Day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedView === 'week' && styles.selectedToggle]}
            onPress={() => setSelectedView('week')}
          >
            <Text style={styles.toggleText}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedView === 'month' && styles.selectedToggle]}
            onPress={() => setSelectedView('month')}
          >
            <Text style={styles.toggleText}>Month</Text>
          </TouchableOpacity>
          {/* Add buttons for monthly and yearly views as needed... */}
        </View>

        
        {/* Predictions Section */}
        <View style={styles.infoPredictionSection}>
          <View style={styles.infoBox}>
            <Text style={styles.cardTitleText}>Predictions</Text>

            <View style={styles.childInfoBox}>
            <Text style={styles.infoValue}>Hyperglycemia Prediction:</Text>
            <Text style={[styles.prediction, {padding: 10, color: predictionState === 'hypoglycemia' ? 'green' : predictionState === 'hyperglycemia' ? 'red' : 'green'} ]}>{predictedHyperglycemia}</Text>
          </View>

          <View style={styles.childInfoBox}>
            <Text style={styles.infoValue}>Hypoglycemia Prediction:</Text>
            <Text style={[styles.prediction, {padding: 10, color: predictionState === 'hypoglycemia' ? 'red' : predictionState === 'hyperglycemia' ? 'green' : 'green'} ]}>{predictedHypoglycemia}</Text>
          </View>

        </View>

        {/* Current Blood Glucose Level Section */}
        <View style={styles.infoPredictionSection}>
          <View style={styles.infoBox}>
            <View style={styles.titleBox}>
            <TouchableOpacity onPress={() => navigation.navigate("MainPage")} style={styles.iconButton}>
              <Fontiso name="blood-drop" style={[styles.icon, {color: 'red'}]} />
            </TouchableOpacity>
            <Text style={styles.cardTitleText}>Blood Glucose Level</Text>
            </View>
            <Text style={[styles.riskText, {fontSize: 20}]}>
              {bloodGlucose} mg/dL
            </Text>
          </View>
        </View>

        <View style={styles.infoSweatSection}>
          <View style={styles.infoBox}>
            <View style={styles.titleBox}>
            <TouchableOpacity onPress={() => navigation.navigate("MainPage")} style={styles.iconButton}>
              <Entypo name="water" style={[styles.icon, {color: 'lightblue'}]} />
            </TouchableOpacity>
            <Text style={styles.cardTitleText}>Sweat Glucose Level</Text>
            </View>
            <Text style={[styles.riskText, {fontSize: 20}]}>
              {sweatGlucose} mmol/L
            </Text>
          </View>
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
            <Fontisto name="blood-drop" style={styles.specificIcon} />
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
  };
  
  const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      flexDirection: 'column',
      backgroundColor: '#051622',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    container: {
      flex: 1,
      backgroundColor: '#051622',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    text: {
      color: '#DEB992',
      fontSize: 30,
      marginTop: 0,
      marginBottom: 0,
      fontWeight: 'bold',
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    toggleButton: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginHorizontal: 5,
    },
    selectedToggle: {
      backgroundColor: '#1BA098',
    },
    toggleText: {
      color: '#DEB992',
    },
    infoSection: {
      alignItems: 'center',
      marginBottom: 20,
    },
    infoPredictionSection: {
      alignItems: 'center',
      marginTop: 30,
    },
    infoSweatSection: {
      alignItems: 'center',
      marginTop: 30,
    },
    // displaySection: {
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   marginTop: 20,
    // },
    infoTitle: {
      color: '#DEB992',
      fontSize: 24,
      marginBottom: 8,
    },
    infoBox: {
      backgroundColor: '#1B2130',
      borderRadius: 10,
      padding: 16,
      alignItems: 'center',
    },
    titleBox: {
      flexDirection: 'row',
      backgroundColor: '#1B2130',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20,
    },
    graphBox: {
      backgroundColor: '#1B2130',
      borderRadius: 10,
      padding: 6,
      alignItems: 'center',
    },
    infoValue: {
      color: '#DEB992',
      fontSize: 18,
    },
    prediction: {
      color: '#BD482A',
      fontSize: 18,
    },
    userIcon: {
      marginLeft: 10,
      fontSize: 20,
      color: '#DEB992',
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
    },
    iconButton: {
        marginHorizontal: 20, // Add more space between icons
        marginVertical: 15,
    },
    icon: {
        fontSize: 30,
        color: '#DEB992',
    },
    specificIcon: {
        fontSize: 30,
        color: '#1BA098',
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
    image: {
      width: 370, // Set width of the image
      resizeMode: 'contain',
      // marginTop: -220,
      // marginBottom: -220,
      height: 200,
    },
    graphContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      marginTop: 30,
      paddingBottom: 20,
    },
    graphBox: {
      backgroundColor: '#1B2130',
      borderRadius: 10,
      padding: 6,
      alignItems: 'center',
    },
    cardTitleText: {
      color: '#DEB992',
      fontSize: 25,
      marginTop: 10,
      marginBottom: 0,
      fontWeight: 'bold',
      paddingBottom: 10,
    },
    graphTitleText: {
      color: '#DEB992',
      fontSize: 20,
      marginTop: 10,
      marginBottom: 0,
      fontWeight: 'bold',
      paddingBottom: 10,
    },
    riskSection: {
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 40,
    },
    riskText: {
      color: '#DEB992',
      fontSize: 25,
      marginTop: 10,
      marginBottom: 0,
      fontWeight: 'bold',
    },
    childInfoBox: {
      // backgroundColor: '#1A1A1A',
      backgroundColor: '#1B2130',
      borderRadius: 10,
      padding: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ffffff1a',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 6,
      margin: 10,
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center',
      alignContent: 'center',
      paddingRight: 10,
      paddingTop: 15,
      paddingBottom : 10,
      width: '110%',
      backgroundColor: '#1B2130',
    },
    
  });


