import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

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
        data: [50, 75, 60, 90, 100, 120 ],
        color: (opacity = 1) => `rgba(222, 185, 146, ${opacity})`,
      },
    ],
  };
  
  // Add data for monthly and yearly views as needed...
  

const PressureSensorAnalytics = () => {
    const [selectedView, setSelectedView] = useState('weekly');

    const renderChartData = () => {
      switch (selectedView) {
        case 'weekly':
          return weeklyData;
        case 'monthly':
          return monthlyData;
        // Add cases for monthly and yearly views...
        default:
          return weeklyData;
      }
    };
  
    const handleDataPointPress = (value) => {
      setTooltipValue(value);
    };
  
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
            style={[styles.toggleButton, selectedView === 'weekly' && styles.selectedToggle]}
            onPress={() => setSelectedView('weekly')}
          >
            <Text style={styles.toggleText}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedView === 'monthly' && styles.selectedToggle]}
            onPress={() => setSelectedView('monthly')}
          >
            <Text style={styles.toggleText}>Monthly</Text>
          </TouchableOpacity>
          {/* Add buttons for monthly and yearly views as needed... */}
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
  });  

export default PressureSensorAnalytics;
