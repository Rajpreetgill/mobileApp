import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const BleComponent = () => {
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    const manager = new BleManager();

    const startScanning = async () => {
      try {
        await manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.error(error);
            return;
          }
          if (deviceList.findIndex((d) => d.id === device.id) === -1) {
            setDeviceList((prevDevices) => [...prevDevices, device]);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    startScanning();

    return () => {
      manager.stopDeviceScan();
    };
  }, [deviceList]);

  const connectToDevice = async (deviceId) => {
    const manager = new BleManager();
    const device = await manager.connectToDevice(deviceId);
    console.log('Connected to device:', device.id);
  };

  return (
    <View>
      <Text>Available Devices:</Text>
      {deviceList.map((device) => (
        <View key={device.id}>
          <Text>{device.name || 'Unknown'}</Text>
          <Button onPress={() => connectToDevice(device.id)} title="Connect" />
        </View>
      ))}
    </View>
  );
};

export default BleComponent;
