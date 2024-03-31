import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
      data: [80, 40, 60, 90, 50, 10 ],
      color: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
    },
  ],
};


  // export function BloodGlucoseLineChart({ selectedView }) {
  //   const weeklyData = {
  //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //     datasets: [
  //       {
  //         data: [20, 45, 28, 80, 100, 120, 20],
  //         color: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
  //       },
  //     ],
  //   };
  
  //   const monthlyData = {
  //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  //     datasets: [
  //       {
  //         data: [80, 40, 60, 90, 50, 10],
  //         color: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
  //       },
  //     ],
  //   };
  
  //   const renderChartData = () => {
  //     switch (selectedView) {
  //       case 'weekly':
  //         return weeklyData;
  //       case 'monthly':
  //         return monthlyData;
  //       default:
  //         return weeklyData;
  //     }
  //   };
  
  //   return (
  //     <View>
  //     <Text style={styles.infoValue}>Blood Sugar: 120 mg/dL </Text>
  //     <LineChart
  //       data={renderChartData()}
  //       width={350}
  //       height={220}
  //       chartConfig={{
  //         backgroundColor: '#1B2130',
  //         backgroundGradientFrom: '#1B2130',
  //         backgroundGradientTo: '#1B2130',
  //         decimalPlaces: 0,
  //         color: (opacity = 1) => `rgba(27, 160, 152, ${opacity})`,
  //         labelColor: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
  //         style: {
  //           borderRadius: 16,
  //         },
  //         propsForDots: {
  //           r: '6',
  //           strokeWidth: '2',
  //           stroke: '#1BA098',
  //         },
  //       }}
  //       bezier
  //       style={{
  //         marginVertical: 8,
  //         borderRadius: 16,
  //       }}
  //     />
  //     </View>
  //   );
  // }
  
  export default function BloodGlucoseAnalytics({navigation}) {
    const [selectedView, setSelectedView] = useState('day');
    const [sweatGlucose, setSweatGlucose] = useState([[]]);
    var [glucoseValues, setGlucoseValues] = useState([]);
    var [glucoseValuesTimestamps, setGlucoseValuesTimestamp] = useState([]);
    var [bloodGlucoseLevel, setBloodGlucoseLevel] = useState([]);
    var [predictedHypoglycemia, setPredictedHypoglycemia] = useState([]);
    var [predictedHyperglycemia, setPredictedHyperglycemia] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
      const fetchData = async () => {
          try {
              const username = await AsyncStorage.getItem('curr_username');
              setUsername(username);
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
      getBloodGlucoseLevel();
      getPredictedHypoglycemia();
      getPredictedHyperglycemia();
    }, [selectedView, username]); // Empty dependency array ensures this runs once after the component mounts


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
      // switch (selectedView) {
      //   case 'week':
      //     return weeklyData;
      //   case 'month':
      //     return monthlyData;
      //   // Add cases for monthly and yearly views...
      //   default:
      //     return weeklyData;
      // }
      
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

    
    

    const fetchSweatGlucoseValues = async (username) => {
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
        const response = await axios.get(`https://7a5f-136-159-213-241.ngrok-free.app/get_glucose_data/${username}?start=${startTimestamp}&end=${endTimestamp}`);
        // const response = await axios.get(`https://7a5f-136-159-213-241.ngrok-free.app/get_glucose_data/Lubaba?start=2024-02-25T00:00:00&end=2024-02-29T09:09:31`);
        // Extract glucose values and timestamps from the response
        const glucoseData = response.data.glucoseData;
        console.log(glucoseData);
        glucose = [];
        timestamps = [];
        // Iterate over glucoseData array and extract values
        glucoseData.forEach(data => {
          glucose.push(data.glucose);
          timestamps.push(data.timestamp);
        });
        // console.log(glucoseValues);
        setGlucoseValues(glucose);
        setGlucoseValuesTimestamp(timestamps);
      } catch (error) {
          console.error('Error fetching glucose values:', error);
      }
    }
  
  
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Blood Glucose Data</Text>
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
  
        {/* Current Blood Glucose Level Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Blood Glucose Level</Text>
            <Text style={styles.infoValue}>{bloodGlucoseLevel} mg/dL</Text>
          </View>
        </View>
  
        {/* Predictions Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Predictions</Text>
            <Text style={styles.infoValue}>Next Hypoglycemia:</Text>
            <Text style={styles.prediction}>{predictedHypoglycemia}</Text>
            <Text style={styles.infoValue}>Next Hypoglycemia:</Text>
            <Text style={styles.prediction}>{predictedHyperglycemia}</Text>
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
            <Icon name="linechart" style={styles.specificIcon} />
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
    infoTitle: {
      color: '#DEB992',
      fontSize: 24,
      marginBottom: 8,
    },
    infoBox: {
      backgroundColor: '#1A1A1A',
      borderRadius: 10,
      padding: 16,
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


