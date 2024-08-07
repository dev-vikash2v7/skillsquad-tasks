import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './src/Screens/SignUpScreen';
import LoginScreen from './src/Screens/LoginScreen';
import HomeScreen from './src/Tabs/HomeScreen';
import VideoCallScreen from './src/Tabs/VideoCallScreen';
import PaymentScreen from './src/Tabs/PaymentScreen';
import OrderSuccess from './src/Screens/OrderSuccess';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from './src/Components/Header';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from './src/Constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {


  const [isUser , setIsUser] = useState(true)

  useEffect(()=>{
  AsyncStorage.getItem('user')
  .then(user =>{
            setIsUser(true);
  })
      setIsUser( false)
  }, [])
  
  function HomeStackNavigator() {
    return (
      <Stack.Navigator     
      initialRouteName='HomeScreen'
        screenOptions={ {
            headerStyle: {
              backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color

            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
              fontSize: 15, 
            },
        }}
        > 

        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      
      
        <Stack.Screen name="OrderSuccess" component={OrderSuccess} options={{ headerShown: false }}/>


    </Stack.Navigator>
 
    );
  }


  
  function AuthStack() {
    return (
      <Stack.Navigator  > 

      {/* <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown:false}} 
      /> */}
      
      <Stack.Screen name="LogIn" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        )
    }


  
  function TabNavigator() {
   
  
    return (
      
      <Tab.Navigator 
      screenOptions={{
        tabBarHideOnKeyboard:true,
        header: () => <Header />,
        
        tabBarStyle:  
        {
          // "display": "flex",
          "height" : 45 ,
          "alignItems" : 'center',
          "marginBottom" : 4,
          justifyContent:'center'
        },
      }}>

    
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            // <CustomTabIcon iconName={""}  focused={focused} />
            <></>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel ,  focused && styles.tabLabelFocused]}>
              Home
            </Text>
          ),
        }}
      />


      <Tab.Screen
        name="VideoCall"
        component={VideoCallScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <></>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              Video Call
            </Text>
          ),
        }}
      />
      
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <></>

          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              Payment
            </Text>
          ),
        }}
      />
      
    
    </Tab.Navigator>  
    );
  }

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName={isUser ?  'MainTabs' : 'Auth' }>
       
      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{ headerShown: false }} 
      />

      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      </Stack.Navigator>



    </NavigationContainer>
  );
};

export default App;


const styles = StyleSheet.create({
  tabLabel: {
    color: 'black', 
    fontSize: 15, 
    fontWeight: 'bold', 
    marginBottom : 10
  },
  tabLabelFocused: {
    color: COLORS.primary,
  },
  toast:{
 justifyContent :'center' ,
 alignItems:'center' ,
 width:  100 ,
 height : 80 ,
 padding: 1,
 backgroundColor : 'lightgreen',
 alignSelf:'center'
  },
  toastText : {
    fontSize : 16 , 
  }
});
