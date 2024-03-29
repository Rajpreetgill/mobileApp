import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { BleManager } from "react-native-ble-plx";
import { useState, useEffect, useRef } from "react";
import { atob } from "react-native-quick-base64";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

//=== Android Bluetooth Code ===//

// import { PermissionsAndroid} from "react-native";
// Android Bluetooth Permission
// async function requestLocationPermission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//       {
//         title: "Location permission for bluetooth scanning",
//         message:
//           "Grant location permission to allow the app to scan for Bluetooth devices",
//         buttonNeutral: "Ask Me Later",
//         buttonNegative: "Cancel",
//         buttonPositive: "OK",
//       }
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("Location permission for bluetooth scanning granted");
//     } else {
//       console.log("Location permission for bluetooth scanning denied");
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }
// requestLocationPermission();

//=== END Android Bluetooth Code ===//

//=== Bluetooth Setup ===//
const bleManager = new BleManager();
const ISOLE_SVC_UUID = "00000001-710e-4a5b-8d75-3e5b444bc3cf";
const CHARACTERISTIC_UUID = "00000003-710e-4a5b-8d75-3e5b444bc3cf";

// const bleManager = new BleManager({
//   restoreStateIdentifier: "123", // Replace with a unique identifier
//   restoreStateFunction: (peripherals) => {
//     // Handle the restoration of peripherals if needed
//     console.log("Restored peripherals:", peripherals);
//   },
// });


export default function Bluetooth({navigation}) {
  // console.log("UID Check: ", GLUCOSE_CHARACTERISTIC_UUID);
  //=== Bluetooth Setup ===//
  const [deviceID, setDeviceID] = useState(null);
  const [sweatValue, setSweatValue] = useState(0);
  const [pressureValue1, setPressureValue1] = useState(0);
  const [pressureValue2, setPressureValue2] = useState(0);
  const [pressureValue3, setPressureValue3] = useState(0);
  const [pressureValue4, setPressureValue4] = useState(0);
  const [pressureValue5, setPressureValue5] = useState(0);
  const [pressureValue6, setPressureValue6] = useState(0);
  const [sweatDataChar, setSweatDataChar] = useState(null);
  const [pressureDataChar, setPressureDataChar] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Searching Device ...");
  const [username, setUsername] = useState('');

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
}, []); // Empty dependency array ensures this runs once after the component mounts


  const deviceRef = useRef(null);

  const searchAndConnectToDevice = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        setConnectionStatus("Error searching for devices");
        return;
      }
      if (device.name === "raspberrypi") { // Need to modify device name here
        bleManager.stopDeviceScan();
        setConnectionStatus("Connecting...");
        // refreshDeviceCache();
        connectToDevice(device);
      }
    });
  };

  useEffect(() => {
    searchAndConnectToDevice();
  }, []);

  const connectToDevice = async (device) => {
    return device
      .connect()
      .then((device) => {
        setDeviceID(device.id);
        setConnectionStatus("Connected");
        deviceRef.current = device;
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        return device.services();
      })
      .then((services) => {
        let service = services.find((service) => service.uuid === ISOLE_SVC_UUID); // Checks SERVICE_UUID here
        return service.characteristics();
      })
      .then((characteristics) => {
        let dataCharacteristic = characteristics.find(
          (char) => {
            char.uuid === CHARACTERISTIC_UUID; 
            console.log("Char uuid: ", char.uuid);
            // console.log("Char uuid: ", char);
            return char.uuid;
          }

        );
        // Ensure that stepDataCharacteristic is not undefined before calling monitor
        if (dataCharacteristic) {
          setPressureDataChar(dataCharacteristic);
          dataCharacteristic.monitor(async (error, char) => {
            const rawData = atob(char.value); // taking data coming from I-SOLE device and setting it to rawSweatData
            console.log("Received data:", rawData);
            
            const splitResult = rawData.toString().split('|');
            const rawPressureData1 = splitResult[0];    // '75kPa'
            const rawPressureData2 = splitResult[1];    // '75kPa'
            const rawPressureData3 = splitResult[2];    // '75kPa'
            const rawPressureData4 = splitResult[3];    // '75kPa'
            const rawPressureData5 = splitResult[4];    // '75kPa'
            const rawPressureData6 = splitResult[5];    // '75kPa'
            const rawSweatData = splitResult[6]; // '40.1 C'
            setSweatValue(rawSweatData); // Set the sweat value here
            setPressureValue1(rawPressureData1); // Set the pressure value here
            setPressureValue2(rawPressureData2); // Set the pressure value here
            setPressureValue3(rawPressureData3); // Set the pressure value here
            setPressureValue4(rawPressureData4); // Set the pressure value here
            setPressureValue5(rawPressureData5); // Set the pressure value here
            setPressureValue6(rawPressureData6); // Set the pressure value here

            if (rawSweatData != null)
            {
                try {
                    const glucoseResponse = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/add_glucose_value/${username}`, {
                    glucose: rawSweatData,
                });
                console.log('USERNAME: ' + username)
                if (glucoseResponse.data.success) {
                    console.log("Updated database successfully");   
                } else {
                    console.log("Failed to save value to database");
                }
                } catch (error) {
                    console.error('Error Blutooth Glucose Post Request:', error);
                }                
            }
            if (rawPressureData1 != null)
            {
                try {
                    const pressureResponse = await axios.post(`https://2232-2604-3d09-3472-7800-1da4-da3b-2ce9-4dea.ngrok-free.app/add_pressure_value/${username}`, {
                    p1: rawPressureData1,
                    p2: rawPressureData2,
                    p3: rawPressureData3,
                    p4: rawPressureData4,
                    p5: rawPressureData5,
                    p6: rawPressureData6,
                });
                if (pressureResponse.data.success) {
                    console.log("Updated database successfully");   
                } else {
                    console.log("Failed to save value to database");
                }
                } catch (error) {
                    console.error('Error Blutooth Presssure Post Request:', error);
                }                
            }
            
          });
        } else {
          console.error("Data characteristic not found.");
        }
      })
      .catch((error) => {
        console.log("Error occured: ", error);
        setConnectionStatus("Error in Connection");
      });
  };

  // this useeffect is for when the device disconnects
  useEffect(() => {
    const subscription = bleManager.onDeviceDisconnected(
      deviceID,
      (error, device) => {
        if (error) {
          console.log("Disconnected with error:", error); // Shows disconnection error
        }
        setConnectionStatus("Disconnected"); // sets connection status to disconnected
        console.log("Disconnected device");
        setSweatValue(0); // Reset the step count or sweat value?
        if (deviceRef.current) {
          setConnectionStatus("Reconnecting...");
          connectToDevice(deviceRef.current) // Attempts to reconnect to the device
            .then(() => setConnectionStatus("Connected")) // id success then we see connected
            .catch((error) => {
              console.log("Reconnection failed: ", error); // if fail then we see disconnected
              setConnectionStatus("Reconnection failed");
            });
        }
      }
    );
    return () => subscription.remove();
  }, [deviceID]);


  //=== Bluetooth Setup End ===//

  return (
    <View style={styles.container}>
        <Text style={styles.text}>I-SOLE Bluetooth</Text>
        <Text style={styles.text}>Connection Status: {connectionStatus}</Text>
        <Text style={styles.text}>Sweat Value: {sweatValue}</Text>
        <Text style={styles.text}>Pressure Value 1: {pressureValue1}</Text>
        <Text style={styles.text}>Pressure Value 2: {pressureValue2}</Text>
        <Text style={styles.text}>Pressure Value 3: {pressureValue3}</Text>
        <Text style={styles.text}>Pressure Value 4: {pressureValue4}</Text>
        <Text style={styles.text}>Pressure Value 5: {pressureValue5}</Text>
        <Text style={styles.text}>Pressure Value 6: {pressureValue6}</Text>
        <StatusBar style="auto" />
        
      
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
  container: {
    flex: 1,
    backgroundColor: '#051622',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#DEB992',
    fontSize: 30,
  },
  image: {
    width: 200,
    height: 200,
  },
  specificIcon: {
    fontSize: 30,
    color: '#1BA098',
},
  iconButton: {
    marginHorizontal: 20, // Add more space between icons
  },
  icon: {
    fontSize: 30,
    color: '#DEB992',
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

});
