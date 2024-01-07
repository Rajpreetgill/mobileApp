import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from './components/Button';
import LoginPage from './pages/LoginPage';
// import Navigation from './Navigation.js';
// import { useNavigation } from '@react-navigation/native';
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator()
// const navigation = useNavigation();


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
import { BleManager } from "react-native-ble-plx";
import { useState, useEffect, useRef } from "react";
import { atob } from "react-native-quick-base64";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const bleManager = new BleManager();
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b"; // Need this for I-SOLE device
const STEP_DATA_CHAR_UUID = "beefcafe-36e1-4688-b7f5-00000000000b"; // Need this for I-SOLE device


const App = () => {

  //=== Bluetooth Setup ===//
  const [deviceID, setDeviceID] = useState(null);
  const [sweatValue, setSweatValue] = useState(10);
  const [pressureValue, setPressureValue] = useState(20);
  const [stepDataChar, setStepDataChar] = useState(null); // Not Used
  const [connectionStatus, setConnectionStatus] = useState("Searching Device ...");

  const deviceRef = useRef(null);

  const searchAndConnectToDevice = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        setConnectionStatus("Error searching for devices");
        return;
      }
      if (device.name === "I-SOLE Device Name") { // Need to modify device name here
        bleManager.stopDeviceScan();
        setConnectionStatus("Connecting...");
        connectToDevice(device);
      }
    });
  };

  useEffect(() => {
    searchAndConnectToDevice();
  }, []);

  const connectToDevice = (device) => {
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
        let service = services.find((service) => service.uuid === SERVICE_UUID); // Checks SERVICE_UUID here
        return service.characteristics();
      })
      .then((characteristics) => {
        let stepDataCharacteristic = characteristics.find(
          (char) => char.uuid === STEP_DATA_CHAR_UUID // Need to figure this out
        );
        setStepDataChar(stepDataCharacteristic);
        stepDataCharacteristic.monitor((error, char) => { // Monitors something here
          if (error) {
            console.error(error);
            return;
          }
          const rawSweatData = atob(char.value); // taking data coming from I-SOLE device and setting it to rawSweatData
          console.log("Received sweat data:", rawSweatData);
          setSweatValue(rawSweatData); // Set the sweat value here
        });
      })
      .catch((error) => {
        console.log(error);
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

  const handleButtonPress = () => {
    console.log('Button pressed!');
    // Add your button press logic here
  };
  
  const handleLoginPress = () => {
    console.log('Login button pressed!');
    // Add your logic to navigate to the login page
    navigation.navigate('LoginPage');
  };

  return (
    <View style={styles.container}>

        <Text style={styles.text}>I-SOLE</Text>
        <Image source={require('./images/Logo.png')} style={styles.image} />
        <Button onPress={handleLoginPress} title="Login" />
        <Button onPress={handleButtonPress} title="Signup" />
        <Text style={styles.text}>Test1</Text>
        <Text style={styles.text}>{connectionStatus}</Text>
        <Text style={styles.text}>Sweat Value: {sweatValue}</Text>
        <Text style={styles.text}>Pressure Value: {pressureValue}</Text>
        <StatusBar style="auto" />
        
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
  }

});


export default App;
