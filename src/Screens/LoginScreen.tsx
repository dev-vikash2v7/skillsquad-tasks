import React, { useState    } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,Pressable
} from 'react-native';


import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper'; 
// import { setUser } from '../Redux/Slices/AuthSlice';
import Button from '../Components/Button';
import { COLORS } from '../Constants/theme';
import icons from '../Constants/icons';

import auth from '@react-native-firebase/auth';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


const LogInScreen = ({navigation}) => {

//   const navigation = useNavigation()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isSubmit , setIsSubmit] = useState(false)
  
  const checkCredentials =async  (user : any)=>{

    try{
    setIsSubmit(true)


    await auth().signInWithEmailAndPassword(email, password);
    setEmail('')
    setPassword('')
    setIsSubmit(false)
    setErrorMessage('')
    navigation.navigate('Home');


    }
    
    catch (e) {
        setIsSubmit(false)
        console.log('error' )

        
        setErrorMessage(e.message);
      }
  
};









  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Please enter both name and password');
      return;
    }
    checkCredentials({email,password})
  };



  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>

                <View style={{ marginVertical: 22 }}>

                    <Text style={{ 
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Hi Welcome Back ! 👋

                  
                        </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Hello again you have been missed!
                    
                    </Text>
                </View>

                

               <View >
                    <Text style={styles.text_label}>Email address</Text>

                    <View style={styles.input_box}>
          <FontAwesome name="envelope-o" color={COLORS.black} size={16} />

                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={styles.input}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 30 }}>
                    <Text style={styles.text_label}>Password</Text>

                    <View style={styles.input_box}>

                    <FontAwesome name="key" color={COLORS.black} size={16} />

                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={styles.input}
                            onChangeText={text => setPassword(text)}
                            value={password}
                        />

                       <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }
                        </TouchableOpacity> 


                    </View>
                </View>

  

               

                 {errorMessage &&
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                }
                    

                {isSubmit ? 
 <ActivityIndicator size={30} color={COLORS.secondary} style ={{marginTop : 10}}/>
:
                <Button
                    title="Login"
                    filled
                    style={{ 
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress = {handleLogin}
                />
                }
{/* 
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View> */}

               


                <View style = {{justifyContent:'center' , alignItems:'center'}}>
                    <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>

                    <Pressable
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.secondary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                    </View>

               
                </View>
               



            </View> 


        </View>


  )
};




export default LogInScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    padding : 20,
    backgroundColor : COLORS.background
},


  input: {
    width : '100%',
    marginLeft : 5,
    color:'#000'
  },
  errorMessage: {
    marginTop : 5 ,
    color: 'red',
    marginBottom: 7,
    fontWeight : 'bold'
  },
  loginText :{
    fontSize : 15,
    alignSelf : 'center',
    marginTop:15,
    color  :  '#000',
    fontWeight : '500'

  },
  loginLink:{
    marginLeft : 4,
    textDecorationLine:'underline',
    color : 'blue',
  },
  text_label:{
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8
},
input_box:{
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
    flexDirection:'row'
}

});

