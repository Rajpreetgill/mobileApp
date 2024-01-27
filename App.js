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
const ISOLE_SVC_UUID = "00000001-710e-4a5b-8d75-3e5b444bc3cf";
const GLUCOSE_CHARACTERISTIC_UUID = "00000002-710e-4a5b-8d75-3e5b444bc3cf";
const PRESSURE_CHARACTERISTIC_UUID = "00000003-710e-4a5b-8d75-3e5b444bc3cf"


const App = () => {

  //=== Bluetooth Setup ===//
  const [deviceID, setDeviceID] = useState(null);
  const [sweatValue, setSweatValue] = useState(0);
  const [pressureValue, setPressureValue] = useState(0);
  const [sweatDataChar, setSweatDataChar] = useState(null);
  const [pressureDataChar, setPressureDataChar] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Searching Device ...");

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
        let service = services.find((service) => service.uuid === ISOLE_SVC_UUID); // Checks SERVICE_UUID here
        return service.characteristics();
      })
      .then((sweatCharacteristics) => { // FOR SWEAT
        let sweatDataCharacteristic = sweatCharacteristics.find(
          (char) => {
            char.uuid === PRESSURE_CHARACTERISTIC_UUID; // Need to figure this out
            console.log("Sweat Char uuid: ", char.uuid);
            // console.log("Char uuid: ", char);
            return char.uuid;
          }
        );
        // Ensure that stepDataCharacteristic is not undefined before calling monitor
        if (sweatDataCharacteristic) {
          sweatDataCharacteristic.monitor((error, char) => {
            const rawSweatData = atob(char.value); // taking data coming from I-SOLE device and setting it to rawSweatData
            //console.log("Received sweat data:", rawSweatData);
            setSweatValue(rawSweatData); // Set the sweat value here
          });
        } else {
          console.error("Sweat data characteristic not found.");
        }
        setSweatDataChar(sweatDataCharacteristic);
      })
      // .then((pressureCharacteristics) => { // FOR Pressure
      //   let pressureDataCharacteristic = pressureCharacteristics.find(
      //     (char) => {
      //       char.uuid === PRESSURE_CHARACTERISTIC_UUID; // Need to figure this out
      //       console.log("Pressure Char uuid: ", char.uuid);
      //       // console.log("Char uuid: ", char);
      //       return char.uuid;
      //     }

      //   );
      //   // Ensure that stepDataCharacteristic is not undefined before calling monitor
      //   if (pressureDataCharacteristic) {
      //     pressureDataCharacteristic.monitor((error, char) => {
      //       const rawPressureData = atob(char.value); // taking data coming from I-SOLE device and setting it to rawSweatData
      //       //console.log("Received pressure data:", rawSweatData);
      //       setPressureValue(rawPressureData); // Set the sweat value here
      //     });
      //   } else {
      //     console.error("Pressure data characteristic not found.");
      //   }
      //   setPressureDataChar(pressureDataCharacteristic);
      // })
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
        <Text style={styles.text}>Test</Text>
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
