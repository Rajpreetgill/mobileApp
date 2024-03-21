import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Feedback({navigation}) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Chats</Text>
  
      <View style={styles.unreadContainer}>
        <Text style={styles.text}>Unread Messages</Text>
          {/* Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.profileIcon}>
          <Icon name="user" style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.textbody}>Alex: ok</Text>
      <Text style={styles.textbodyrole}>Physician</Text>
      <Text style={styles.textbody}>Dr. Sheikh</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Inbox")} style={styles.iconButton}>
          <Icon name="inbox" style={styles.iconOne} />
          <Icon name="phone" style={styles.iconOne} />
        </TouchableOpacity>
      </View>

      <View style={styles.previousContainer}>
        <Text style={styles.text}>Previous Conversations</Text>
          {/* Profile Icon */}
          <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.profileIcon}>
          <Icon name="user" style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.textbody}>Alex: thank you so much</Text>
      <Text style={styles.textbodyrole}>Physician</Text>
      <Text style={styles.textbody}>Dr. Sheikh</Text>
  
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Inbox")} style={styles.iconButton}>
          <Icon name="inbox" style={styles.iconOne} />
          <Icon name="phone" style={styles.iconOne} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.container}>
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
        justifyContent: 'center', // Align icons to the bottom
        paddingBottom: 20, // Add padding to bottom
    },

    unreadContainer: {
      alignItems: 'flex-start', // Align text to the left
      marginLeft: 20, // Add margin to the left of text
      marginTop: 160, // Add margin-top for spacing between text elements
    },
    previousContainer: {
      alignItems: 'flex-start', // Align text to the left
      marginLeft: 20, // Add margin to the left of text
      marginTop: 120, // Add margin-top for spacing between text elements
    },

    text: {
        color: '#1BA098',
        fontSize: 20,
        marginTop: 50,      
        marginLeft: -200,
        textAlign: 'left'
    },

    title: {
      color: '#DEB992',
      fontSize: 30,
      marginTop: 50,
      marginBottom: -120,
      marginLeft: -150
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
    profileIcon: {
      fontSize: 30,
      color: '#DEB992',
      marginLeft: -90,
      marginTop: 20,
      fontSize: 40
    },
    specificIcon: {
        fontSize: 30,
        color: '#1BA098',
    },

    name: {
      fontSize: 1, // Adjust font size if needed
      color: '#DEB992',
    },
    textbody: {
        color: '#1BA098',
        fontSize: 16,
        marginTop: -27,   
        marginBottom: -10,    
        marginLeft: 10,
    },
    textbodyrole: {
      color: '#105f5a',
      fontSize: 16,
      marginTop: -27,   
      marginBottom: -10,    
      marginLeft: 10,
  },
  iconOne: {
    fontSize: 22,
    color: '#DEB992',
    marginLeft: 290,
    marginTop: 5
  },
});