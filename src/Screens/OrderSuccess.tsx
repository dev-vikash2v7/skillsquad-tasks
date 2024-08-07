import {View, Text, Image} from 'react-native';
import React,{useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import { fontSize } from '../Constants/theme';
import { ScaledSheet } from 'react-native-size-matters';
import { Button } from 'react-native-paper';

const OrderSuccess = ({route , navigation}) => {


  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    return () =>
    navigation.getParent()?.setOptions({ 
      tabBarStyle:  { 
        height : 80,
        alignItems:'center',
    }, 
    tabBarVisible: true 
  });
}, [navigation]);

const {orderDetails} = route.params


const {billingDetails} = orderDetails
const {name , email , phone} = billingDetails




  return (
    <View style={styles.container}>
      {/* <Image source={appIcons.done} style={styles.icon} />  */}
      <Text style={styles.msg}>Payment Successfull</Text>


      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <Text style={{color:'#000'}}>Order ID: {orderDetails.id}</Text>
        <Text style={{color:'#000'}}>Amount: {orderDetails.amount}</Text>
        <Text style={{color:'#000'}}>Payment Status: {orderDetails.paymentStatus}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reciver Details</Text>
        <Text style={{color:'#000'}}>{name}</Text>
        <Text style={{color:'#000'}}>{email}</Text>
        <Text style={{color:'#000'}}>{phone}</Text>
      </View>
      
      
      <Button
        style={styles.btn}
        onPress={() => {
          navigation.replace('Home' );
        }}>
        Go To Home Screen
      </Button>
    </View>
  );
};



export default OrderSuccess;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft:40
  },
  
  msg: {
    marginTop: '20@vs',
    fontSize: fontSize.large,
    color: 'green',
    marginBottom:30
  },
  btn: {
    padding: '5@ms',
    borderWidth: 1,
    color: '#000',
    marginTop: '20@vs',
  borderBlockColor:'#000',
  borderColor:'#000',
  width:'250@ms',
  alignSelf:'center',
  marginRight:40
  },
  section: {
    marginBottom: '20@vs',
    color:'#000',

  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: fontSize.large,
    marginBottom: '10@vs',
    color: '#000',

  },
});
