import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dailyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 100, 120, 20],
      color: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
    },
  ],
};

const weeklyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [70, 45, 90,  80, 45, 120, 75],
      color: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
    },
  ],
};
 
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [50, 75, 60, 90, 100, 120 ],
        color: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
      },
    ],
  };
  
  export function PressureLineChart({ selectedView }) {

    const weeklyData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [20, 45, 28, 80, 100, 120, 20],
          color: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
        },
      ],
    };
  
    const monthlyData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          data: [80, 40, 60, 90, 50, 10],
          color: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
        },
      ],
    };


    const renderChartData = () => {
      switch (selectedView) {
        case 'weekly':
          return weeklyData;
        case 'monthly':
          return monthlyData;
        default:
          return weeklyData;
      }
    };

    return (
      <View>
      <Text style={styles.infoValue}>Blood Pressure: 120 mg/dL </Text>
        <LineChart
          data={renderChartData()}
          width={350}
          height={220}
          chartConfig={{
            backgroundColor: '#1B2130',
            backgroundGradientFrom: '#1B2130',
            backgroundGradientTo: '#1B2130',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(27, 160, 152, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#1BA098',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  }

export default function PressureAnalytics({navigation}) {
    const [selectedView, setSelectedView] = useState('day');
    const [selectedDuration, setSelectedDuration] = useState('5 min');
    const [footRegion, setfootRegion] = useState('p1');
    const [averagePressure, setAveragePressure] = useState(null);
    const [diabeticUncerationRisk, setDiabeticUlcerationRisk] = useState('Unknown');
    const [username, setUsername] = useState('');

    const renderChartData = () => {

      // const graphData = {
      //   labels: glucoseValuesTimestamps,
      //   datasets: [
      //     {
      //       data: glucoseValues,
      //       color: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
      //     },
      //   ],
      // };
      // return graphData;
  
      switch (selectedView) {
        case 'day':
          return dailyData;
        case 'week':
          return weeklyData;
        case 'month':
          return monthlyData;
        default:
          return dailyData;
      }
    };

    useEffect(() => {
      const fetchData = async () => {
          try {
              const usrname = await AsyncStorage.getItem('curr_username');
              setUsername(usrname);
          } catch (e) {
              // Handle errors here
              console.error("Error retrieving data", e);
          }
      };
      fetchData();
      // fetchPressuerValues(username);
    }, [selectedView]); // Empty dependency array ensures this runs once after the component mounts

    const fetchPressuerValues = async (username) => {
      try {
        // const startTimestamp = '2024-01-01T00:00:00'; // Replace with your desired start timestamp
        // const endTimestamp = '2024-01-31T23:59:59';   // Replace with your desired end timestamp
        console.log("HERE");
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth(); // Month is zero-based
        const day = today.getDate();
        const dayOfWeek = today.getDay();

        // Get the current time
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();

        var startTimestamp = ''; // Replace with your desired start timestamp
        var endTimestamp = '';   // Replace with your desired end timestamp

        var currentDate = new Date(year, month, day).toISOString().split('T')[0];
        var currentDateTimeISO = currentDate + 'T' + hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
        console.log(currentDateTimeISO);
        if(selectedView == 'day')
        {
          startTimestamp = currentDate + 'T00:00:00';
          endTimestamp = currentDateTimeISO;
        }
        else if(selectedView == 'week')
        {
          // Get the start of the week (Sunday)
          const startOfWeek = new Date(year, month, day - dayOfWeek);
          const startOfWeekISO = startOfWeek.toISOString().split('T')[0]; // Remove time part
          startTimestamp = startOfWeekISO + 'T00:00:00';
          endTimestamp = currentDateTimeISO;
        }
        else if(selectedView == 'month')
        {
          // Get the start of the month
          const startOfMonth = new Date(year, month, 1);
          const startOfMonthISO = startOfMonth.toISOString().split('T')[0]; // Remove time part
          startTimestamp = startOfMonthISO + 'T00:00:00';
          endTimestamp = currentDateTimeISO;
        }

        // const response = await axios.get(`https://i-sole-backend.com/get-sweat-glucose-values/${username}`);
        const response = await axios.get(`https://7a5f-136-159-213-241.ngrok-free.app/get_pressure_data/${username}?start=${startTimestamp}&end=${endTimestamp}`);
        // const response = await axios.get(`https://7a5f-136-159-213-241.ngrok-free.app/get_pressure_data/Lubaba?start=2024-02-25T00:00:00&end=2024-02-29T09:09:31`);
        // Extract glucose values and timestamps from the response
        const pressureData = response.data.pressureData;
        console.log(pressureData);
        pressure = [];
        timestamps = [];
        // Iterate over glucoseData array and extract values
        pressureData.forEach(data => {
          pressure.push(data.pressure);
          timestamps.push(data.timestamp);
        });
        // console.log(glucoseValues);
        setPressureValues(pressure);
        setPressureValuesTimestamp(timestamps);
      } catch (error) {
          console.error('Error fetching pressure values:', error);
      }
    }

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
          const response = await axios.get(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/get_average_pressure/${username}?start=${startTime}&end=${endTime}&footRegion=${footRegion}`);
          if (response.data.success) {
            setAveragePressure(response.data.averagePressure);
            setDiabeticUlcerationRisk(response.data.diabeticUncerationRisk);
            console.log(diabeticUncerationRisk);
            console.log("Retrieved average successfully");
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
          const response = await axios.get(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/get_average_pressure/${username}?start=${startTime}&end=${endTime}&footRegion=${footRegion}`);
          if (response.data.success) {
            setAveragePressure(response.data.averagePressure);
            setDiabeticUlcerationRisk(response.data.diabeticUncerationRisk);
            console.log(diabeticUncerationRisk);

            console.log("Retrieved average successfully");
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
          const response = await axios.get(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/get_average_pressure/${username}?start=${startTime}&end=${endTime}&footRegion=${footRegion}`);
          if (response.data.success) {
            setAveragePressure(response.data.averagePressure);
            setDiabeticUlcerationRisk(response.data.diabeticUncerationRisk);
            // if(averagePressure == "None")
            // {
            //   setDiabeticUlcerationRisk("Unknown");
            // }
            // else if(averagePressure <= 200)
            // {
            //   setDiabeticUlcerationRisk("Low");
            // }
            // else if (averagePressure > 200)
            // {
            //   setDiabeticUlcerationRisk("High");
            // }
            console.log(diabeticUncerationRisk);

            console.log("Retrieved average successfully");
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
      }
    };
  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Pressure Analytics</Text>
        </View>

        <Text style={styles.text}>Select Region to View Data</Text>
        <MaterialCommunityIcons name="foot-print" style={styles.footIcon} />

        <TouchableOpacity
            style={[styles.regionButton1, selectedView === 'day' && styles.selectedToggle]}
            onPress={() => setSelectedView('day')}>
          <Text style={styles.toggleText}>P1</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.regionButton2, selectedView === 'day' && styles.selectedToggle]}
            onPress={() => setSelectedView('day')}>
          <Text style={styles.toggleText}>P2</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.regionButton3, selectedView === 'day' && styles.selectedToggle]}
            onPress={() => setSelectedView('day')}>
          <Text style={styles.toggleText}>P3</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.regionButton4, selectedView === 'day' && styles.selectedToggle]}
            onPress={() => setSelectedView('day')}>
          <Text style={styles.toggleText}>P4</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.regionButton5, selectedView === 'day' && styles.selectedToggle]}
            onPress={() => setSelectedView('day')}>
          <Text style={styles.toggleText}>P5</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.regionButton6, selectedView === 'day' && styles.selectedToggle]}
            onPress={() => setSelectedView('day')}>
          <Text style={styles.toggleText}>P6</Text>
        </TouchableOpacity>

        <View style={styles.graphContainer}>
        
        <Text style={styles.text}>Graph Title</Text>
        
        <LineChart
          data={renderChartData()}
          width={350}
          height={220}
          chartConfig={{
            backgroundColor: '#1B2130',
            backgroundGradientFrom: '#1B2130',
            backgroundGradientTo: '#1B2130',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(27, 160, 152, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#1BA098',
            },
          }}
          bezier
          style={{
            marginVertical: 4,
            borderRadius: 16,
            marginTop: 20,
          }}
        />

        <View style={styles.toggleContainer}>
        <TouchableOpacity
              style={[styles.toggleButton, selectedView === 'day' && styles.selectedToggle]}
              onPress={() => setSelectedView('day')}
          >
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
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Average Pressure</Text>

            <View style={styles.averagePressureTimeContainer}>
            <TouchableOpacity
                style={[styles.averageDurationButton, selectedDuration === '5 min' && styles.selectedAveragePressureToggle]}
                onPress={fiveMinButton}>
              <Text style={styles.toggleText}>5 min</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.averageDurationButton, selectedDuration === '1 hr' && styles.selectedAveragePressureToggle]}
                onPress={oneHourButton}>
              <Text style={styles.toggleText}>1 hr</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.averageDurationButton, selectedDuration === 'Daily' && styles.selectedAveragePressureToggle]}
                onPress={dailyButton}>
              <Text style={styles.toggleText}>Daily</Text>
            </TouchableOpacity>
            </View>

            <Text style={styles.average}>{averagePressure} kPa</Text>
          </View>
        </View>

        <View style={styles.riskSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Diabetic Ulceration Risk</Text>
            <Text style={{ color: diabeticUncerationRisk === 'Low' ? 'green' : diabeticUncerationRisk === 'High' ? 'red' : 'yellow', fontSize: 20}}>
              {diabeticUncerationRisk}
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
            <Icon name="linechart" style={styles.icon} />
          </TouchableOpacity>
          
          {/* Dot Chart Icon */}
          <TouchableOpacity onPress={() => navigation.navigate("PressureAnalytics")} style={styles.iconButton}>
            <Icon name="dotchart" style={styles.specificIcon} />
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
      marginTop: 70,
    },
    text: {
      color: '#DEB992',
      fontSize: 25,
      marginTop: 10,
      marginBottom: 0,
    },
    titleText: {
      color: '#DEB992',
      fontSize: 30,
      marginTop: 0,
      marginBottom: 0,
      fontWeight: 'bold',
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 30,
    },
    infoSection: {
      alignItems: 'center',
      marginTop: 40,
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
    prediction: {
      fontSize: 18,
    },
    average: {
      color: '#DEB992',
      fontSize: 20,
      paddingTop: 15,
    },
    toggleButton: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginHorizontal: 5,
    },
    regionButton1: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 60,
      marginLeft:  '10%',
      marginRight: 260,
      marginTop: -220,
      marginBottom: 10,
    },
    regionButton2: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 60,
      marginLeft:  0,
      marginRight: 180,
      marginTop: -40,
      marginBottom: 0,
    },
    regionButton3: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 60,
      marginLeft:  0,
      marginRight: 100,
      marginTop: -35,
      marginBottom: 0,
    },
    regionButton4: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 60,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 10,
    },
    regionButton5: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 60,
      marginLeft: 50,
      marginRight: 0,
      marginTop: -70,
      marginBottom: 10,
    },
    regionButton6: {
      backgroundColor: '#1A1A1A',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 60,
      marginLeft:  60,
      marginRight: 0,
      marginTop: 30,
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
    selectedToggle: {
      backgroundColor: '#1BA098',
    },
    selectedAveragePressureToggle: {
      backgroundColor: '#1BA098',
    },
    toggleText: {
      color: '#DEB992',
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
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
  footIcon: {
    fontSize: 350,
    color: '#1B2130',// '#DEB992',
    transform: [{ rotate: '80deg' }],
    paddingBottom: 0,
    alignItems: 'center',
    marginBottom: 0,
    marginTop: -60,
  },
  riskSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  });  
