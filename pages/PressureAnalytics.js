import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/AntDesign';
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
    var [pressureValues, setPressureValues] = useState([]);
    var [pressureValuesTimestamps, setPressureValuesTimestamp] = useState([]);
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
              // Do something with the retrieved values
              console.log(username);
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
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Pressure Sensor Data</Text>
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

        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Diabetic Ulceration Risk</Text>
            <Text style={styles.prediction}>Low</Text>
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
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    infoSection: {
      alignItems: 'center',
      marginBottom: 20,
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
      backgroundColor: '#1A1A1A',
      borderRadius: 10,
      padding: 16,
      alignItems: 'center',
    },
    prediction: {
      color: '#BD482A',
      fontSize: 18,
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
    }
  });  
