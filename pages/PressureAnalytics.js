import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Buffer } from 'buffer';


export default function PressureAnalytics({navigation}) {
    const [selectedDuration, setSelectedDuration] = useState('5 min');
    const [footRegion, setFootRegion] = useState('p1');
    const [averagePressure, setAveragePressure] = useState(null);
    const [diabeticUlcerationRisk, setDiabeticUlcerationRisk] = useState('');
    const [username, setUsername] = useState('');
    const [graphTitle, setGraphTitle] = useState('');
    const [imageString, setImageString] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const usrname = await AsyncStorage.getItem('curr_username');
              setUsername(usrname);
              // Get Graph Data
              setGraphName();

              // Get Graph Image
              try {
                const response = await fetch(`https://i-sole-backend.com/plot_pressure?username=${username}&start_timestamp=${0}&end_timestamp=${0}&region=${footRegion}`);
                const blob = await response.blob();
                setImageString(URL.createObjectURL(blob));
                console.log(imageString);
              } catch (error) {
                console.error('Error fetching image:', error);
              }

              // Update average pressure and risk
              if(selectedDuration == '5 min')
              {
                fiveMinButton();
              }
              if(selectedDuration == '1 hr')
              {
                oneHourButton();
              }
              if(selectedDuration == 'Daily')
              {
                dailyButton();
              }

          } catch (e) {
              // Handle errors here
              console.error("Error retrieving data", e);
          }
      };
      fetchData();
    }, [footRegion]); // Empty dependency array ensures this runs once after the component mounts

    const fiveMinButton = async (e) => {
      // Get the current date and time
      var currentDateTime = new Date();
      // Subtract 5 minutes (5 * 60 * 1000 milliseconds) from the current date
      var fiveMinutesAgo = new Date(currentDateTime.getTime() - (5 * 60 * 1000));

      // Convert to ISO 8601 format
      var currentDateTimeIsoString = currentDateTime.toISOString();
      var fiveMinIsoString = fiveMinutesAgo.toISOString();

      // Extract date portion and remove milliseconds
      var startTime = fiveMinIsoString.slice(0, 19);
      var endTime = currentDateTimeIsoString.slice(0, 19);

      if(username != '')
      {
        try {
          // Make a POST request to your backend sign-in endpoint
          const response = await axios.get(`https://i-sole-backend.com/get_average_pressure_and_risk/${username}`); //?start=${startTime}&end=${endTime}&footRegion=${footRegion}`);
          if (response.data.success) {
            setAveragePressure(response.data.data['maxPressure'] + ' kPa');
            setDiabeticUlcerationRisk(response.data.data[footRegion + '_risk']);
            // console.log("Average Pressure:", averagePressure);
            // console.log("Diabetic Ulceration risk:", diabeticUlcerationRisk);
            // console.log("Retrieved average successfully");
          } 
          else {
            // Retrieve failed
            console.error('Average retrieval failed:', response.data.message);
          }
        } catch (error) {
            console.error('Error retrieving average:', error);
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        }
        setSelectedDuration('5 min');
      }
    };

    const oneHourButton = async (e) => {
      // Get the current date and time
      var currentDateTime = new Date();
      // Subtract one hour (1 * 60 * 60 * 1000 milliseconds) from the current date
      var oneHourAgo = new Date(currentDateTime.getTime() - (1 * 60 * 60 * 1000));

      // Convert to ISO 8601 format
      var currentDateTimeIsoString = currentDateTime.toISOString();
      var oneHourAgoIsoString = oneHourAgo.toISOString();

      // Extract date portion and remove milliseconds
      var startTime = oneHourAgoIsoString.slice(0, 19);
      var endTime = currentDateTimeIsoString.slice(0, 19);

      if(username != '')
      {
        try {
          // Make a POST request to your backend sign-in endpoint
          const response = await axios.get(`https://i-sole-backend.com/get_average_pressure_and_risk/${username}`); //?start=${startTime}&end=${endTime}&footRegion=${footRegion}`);
          if (response.data.success) {
            setAveragePressure(response.data.data[footRegion + '_avg'] + ' kPa');
            setDiabeticUlcerationRisk(response.data.data[footRegion + '_risk']);
            // console.log("Average Pressure:", averagePressure);
            // console.log("Diabetic Ulceration risk:", diabeticUlcerationRisk);
            // console.log("Retrieved average successfully");
          } 
          else {
            // Retrieve failed
            console.error('Average retrieval failed:', response.data.message);
          }
        } catch (error) {
            console.error('Error retrieving average:', error);
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        }
        setSelectedDuration('1 hr');
      }
    };

    const dailyButton = async (e) => {
      // Get the current date and time
      var currentDateTime = new Date();
      // Set the time to the start of the day (midnight)
      currentDateTime.setHours(0, 0, 0, 0);
      var start = currentDateTime.toISOString(); 

      // Set the time to the end of the day (11:59:59 PM)
      currentDateTime.setHours(23, 59, 59, 999);
      var end = currentDateTime.toISOString();
      
      var startTime = start.slice(0, 19);
      var endTime = end.slice(0, 19);



      if(username != '')
      {
        try {
          // Make a POST request to your backend sign-in endpoint
          const response = await axios.get(`https://i-sole-backend.com/get_average_pressure_and_risk/${username}`); //?start=${startTime}&end=${endTime}&footRegion=${footRegion}`);
          if (response.data.success) {
            setAveragePressure(response.data.data[footRegion + '_avg'] + ' kPa');
            setDiabeticUlcerationRisk(response.data.data[footRegion + '_risk']);
            // console.log("Average Pressure:", averagePressure);
            // console.log("Diabetic Ulceration risk:", diabeticUlcerationRisk);
            // console.log("Retrieved average successfully");
          } 
          else {
            // Retrieve failed
            console.error('Average retrieval failed:', response.data.message);
          }
        } catch (error) {
            console.error('Error retrieving average:', error);
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        }
        setSelectedDuration('Daily');
      }
    };

    const setGraphName = () => {
      switch (footRegion) {
        case 'p1':
          setGraphTitle('P1 Pressure Values vs Time');
          break;
        case 'p2':
          setGraphTitle('P2 Pressure Values vs Time');
          break;
        case 'p3':
          setGraphTitle('P3 Pressure Values vs Time');
          break;
        case 'p4':
          setGraphTitle('P4 Pressure Values vs Time');
          break;
        case 'p5':
          setGraphTitle('P5 Pressure Values vs Time');
          break;
        case 'p6':
          setGraphTitle('P6 Pressure Values vs Time');
          break;
      }
    }

  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Pressure Analytics</Text>
        </View>

        {/* Graph Image */}
        <View style={styles.graphContainer}>
        <View style={styles.graphBox}>
        <Text style={styles.cardTitleText}>{graphTitle}</Text>
          <Image
            source= {{uri: imageString}}
            style={styles.image}
          />
        </View>
        </View>

        <View style={styles.footBox}>
        <Text style={styles.cardTitleText}>Select Region to View Data</Text>
        <View style={styles.footContainer}>
        <MaterialCommunityIcons name="foot-print" style={styles.footIcon} />
        <View style={styles.regionContainer}>
        <TouchableOpacity
            style={[styles.regionButton1, footRegion === 'p1' && styles.selectedToggle]}
            onPress={() => setFootRegion('p1')}>
          <Text style={styles.toggleText}>P1</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.regionButton2, footRegion === 'p5' && styles.selectedToggle]}
            onPress={() => setFootRegion('p5')}>
          <Text style={styles.toggleText}>P5</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.regionButton3, footRegion === 'p6' && styles.selectedToggle]}
            onPress={() => setFootRegion('p6')}>
          <Text style={styles.toggleText}>P6</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.regionButton4, footRegion === 'p2' && styles.selectedToggle]}
            onPress={() => setFootRegion('p2')}>
          <Text style={styles.toggleText}>P2</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.regionButton5, footRegion === 'p3' && styles.selectedToggle]}
            onPress={() => setFootRegion('p3')}>
          <Text style={styles.toggleText}>P3</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.regionButton6, footRegion === 'p4' && styles.selectedToggle]}
            onPress={() => setFootRegion('p4')}>
          <Text style={styles.toggleText}>P4</Text>
        </TouchableOpacity>

        </View>
        </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.cardTitleText}>Average Pressure</Text>

            <View style={styles.childInfoBox}>
            <View style={styles.averagePressureTimeContainer}>
            <TouchableOpacity
                style={[styles.averageDurationButton, selectedDuration === '5 min' && styles.selectedAveragePressureToggle]}
                onPress={fiveMinButton}>
              <Text style={styles.durationToggleText}>5 min</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.averageDurationButton, selectedDuration === '1 hr' && styles.selectedAveragePressureToggle]}
                onPress={oneHourButton}>
              <Text style={styles.durationToggleText}>1 hr</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.averageDurationButton, selectedDuration === 'Daily' && styles.selectedAveragePressureToggle]}
                onPress={dailyButton}>
              <Text style={styles.durationToggleText}>Daily</Text>
            </TouchableOpacity>
            </View>
            <Text style={styles.average}>{averagePressure}</Text>
          </View>
          </View>
        </View>

        <View style={styles.riskSection}>
          <View style={styles.infoBox}>
            <Text style={styles.cardTitleText}>Diabetic Ulceration Risk</Text>
            <Text style={[styles.riskText, { color: diabeticUlcerationRisk === 'Low' ? 'green' : diabeticUlcerationRisk === 'High' ? 'red' : '#FFC300', fontSize: 20}]}>
              {diabeticUlcerationRisk}
            </Text>
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
            <MaterialCommunityIcons name="foot-print" style={styles.specificIcon} />
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
      justifyContent: 'space-evenly',
    },
    container: {
      flex: 1,
      backgroundColor: '#051622',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    averagePressureTimeContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      alignContent: 'center',
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center',
      alignContent: 'center',
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom : 10,
      width: '130%',
      backgroundColor: '#1B2130',
    },
    graphContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      marginTop: 30,
      paddingBottom: 20,
    },
    text: {
      color: '#DEB992',
      fontSize: 25,
      marginTop: 10,
      marginBottom: 0,
    },
    riskText: {
      color: '#DEB992',
      fontSize: 25,
      marginTop: 10,
      marginBottom: 0,
      fontWeight: 'bold',
    },
    cardTitleText: {
      color: '#DEB992',
      fontSize: 25,
      marginTop: 10,
      marginBottom: 0,
      fontWeight: 'bold',
      paddingBottom: 10,
    },
    titleText: {
      color: '#DEB992',
      fontSize: 30,
      marginTop: 0,
      marginBottom: 0,
      fontWeight: 'bold',
    },
    infoSection: {
      alignItems: 'center',
      marginTop: 20,
      width: 300,
    },
    infoTitle: {
      color: '#DEB992',
      fontSize: 24,
      marginBottom: 8,
    },
    infoValue: {
      color: '#DEB992',
      fontSize: 18,
    },
    infoBox: {
      // backgroundColor: '#1A1A1A',
      backgroundColor: '#1B2130',
      borderRadius: 10,
      padding: 16,
      alignItems: 'center',
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
    prediction: {
      fontSize: 18,
    },
    average: {
      color: '#DEB992',
      fontSize: 20,
      paddingTop: 10,
      fontWeight: 'bold',
    },
    footContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 0,
      gap: 10,
      height: 200,
    },
    footIcon: {
      fontSize: 370,
      color: '#021522',
      transform: [{ rotate: '80deg' }],
      marginLeft: 40,
      alignItems: 'center',
      marginTop: -140,
    },
    regionContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      marginTop: -180,
      marginRight: -25,
    },
    regionButton1: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 6,
      borderRadius: 60,
      marginLeft:  40,
      marginRight: 300,
      marginTop: 0,
      marginBottom: 10,
      fontSize: 40,
    },
    regionButton2: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 6,
      borderRadius: 60,
      marginLeft:  0,
      marginRight: 170,
      marginTop: -50,
      marginBottom: 0,
    },
    regionButton3: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 6,
      borderRadius: 60,
      marginLeft:  0,
      marginRight: 80,
      marginTop: -45,
      marginBottom: 0,
    },
    regionButton4: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 6,
      borderRadius: 60,
      marginLeft: 10,
      marginRight: 0,
      marginTop: -60,
      marginBottom: 10,
    },
    regionButton5: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 6,
      borderRadius: 60,
      marginLeft: 50,
      marginRight: 0,
      marginTop: -5,
      marginBottom: 10,
    },
    regionButton6: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 6,
      borderRadius: 60,
      marginLeft:  80,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
    },
    averageDurationButton: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      fontSize: 20,
      margin: 5,
    },
    selectedAveragePressureToggle: {
      backgroundColor: '#1BA098',
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
      fontSize: 25,
    },
    durationToggleText: {
      color: '#DEB992',
      fontSize: 20,
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
  riskSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  graphBox: {
      backgroundColor: '#1B2130',
      borderRadius: 10,
      padding: 6,
      alignItems: 'center',
    },

  footBox: {
    backgroundColor: '#1B2130',
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 360, // Set width of the image
    // resizeMode: 'contain',
    // marginTop: -220,
    // marginBottom: -220,
    height: 200
  },
  });  
