import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../components/Button';

export default function HomeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>I-SOLE</Text>
      <Image source={require('../images/Logo.png')} style={styles.image} />
      <Button onPress={() => navigation.navigate("LoginPage")} title="Login" />
      <Button onPress={() => navigation.navigate("SignupPage")} title="Signup" />
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
