import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const user = auth().currentUser;

  useEffect(()=>{

    if(!user?.email){
      navigation.replace("Auth")

    }
  },[])

  const handleLogout = () => {
    auth().signOut();
    navigation.replace("Auth")
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout}  color={'red'} />

      <Text style={styles.text}>Welcome, {user?.email}</Text>


    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,  alignSelf : 'center', paddingTop:20},
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
