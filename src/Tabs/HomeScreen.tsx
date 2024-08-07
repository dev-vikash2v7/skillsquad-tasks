import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const user = auth().currentUser;

  const handleLogout = () => {
    auth().signOut();
    navigation.navigate("LogIn")
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />

      <Text style={styles.text}>Welcome, {user.email}</Text>

      <Button title="Start Video Call" onPress={() => navigation.navigate('VideoCall')} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,  alignSelf : 'center',},
  text:{
    fontSize : 18,
    alignSelf : 'center',
    marginTop:200,
    color  :  '#000',
    fontWeight : '500',
    justifyContent:'center'
  }
});

export default HomeScreen;
