import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const TextField = ({ label, placeholder, secureTextEntry, onChangeText, iconName, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.textInputContainer}>
        <Icon name={iconName} size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor="#DEB992" // Set the color for the placeholder text
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#1BA098',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    width: '50%',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#DEB992',
    marginLeft: 8, // Add margin to separate the icon and text
  },
  label: {
    color: '#DEB992',
    fontSize: 12,
    marginBottom: 4,
  },
  icon: {
    color: '#DEB992',
  },
});

export default TextField;
