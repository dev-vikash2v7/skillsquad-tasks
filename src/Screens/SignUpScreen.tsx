import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../Constants/theme';

import Button from '../Components/Button';

// import { StackActions, useNavigation } from '@react-navigation/native';
// import {useDispatch }  from 'react-redux'
// import { collection,addDoc , query , getDocs , where} from "firebase/firestore";

// import { setUser } from '../Redux/Slices/AuthSlice';
// import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native-paper';
import icons from '../Constants/icons';
import auth from '@react-native-firebase/auth';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Signup = ({navigation} ) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmit , setIsSubmit] = useState(false)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const navigation = useNavigation();

    // const dispatch = useDispatch();




    // const  registerUser = async ( data  )=>{
      
    //        try{

    //     //    console.log({...data , id : docRef.id})

    //         // dispatch(setUser({...data }))
    //       }
    //       catch (e) {
    //         console.log('erere ' , e)
    //         //   Toast.show({ type : 'error' , text1 : 'Signup Failed' ,text2 :  'Please Check Your Internet Connect and Try Again.' })
    //         }
    //   }
      







      
        const handleSignup = async() => {

          if (!name || !email || !password || !confirmPassword || !password ) {
            setErrorMessage('Please fill in all fields');
            return;
          }
      
          if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
          }
        setIsSubmit(true)

          try {
         

            await auth().createUserWithEmailAndPassword(email, password);

            navigation.navigate('Home');

            // if (querySnapshot.empty) {
            //     registerUser({name,address ,  email, password})

            // }
            
            // else {
            // setErrorMessage('Email is Already Exists With Another Account')
            // }
          }
          
          catch (error) {
            console.log(error.message)
            setErrorMessage( error.message);
          }
          setIsSubmit(false)

        };
      
  
    return (
        <ScrollView style={styles.container}>

            <View style={{ flex: 1, marginHorizontal: 22 }}>

                <View style={  { marginTop: 5 , marginBottom : 10 }}>

                    <View style = {{alignItems:'center' , flexDirection:'row',justifyContent :'space-between'}}>

                    <Text style={{

                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Create Account
                    </Text>


                    </View>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Connect with your friend today!</Text>
                </View>


                      {/* Name Input */}
                <View style={ styles.inputBox}>
                    <Text style={styles.label_text}>Your Name</Text>

                    <View style={styles.input_view}>
                       <FontAwesome name="user-o" color={COLORS.black} size={16} />

                        <TextInput
                            placeholder='Enter your name.'
                            placeholderTextColor={COLORS.black}
                            style={styles.input}
                            onChangeText={text => setName(text)}
                            value={name}
                        />
                    </View>
                </View>



{/* Email input */}
                <View style={ styles.inputBox}>
                    <Text style={styles.label_text}>Email address</Text>

                    <View style={styles.input_view}>
                            <FontAwesome name="envelope-o" color={COLORS.black} size={16} />

                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={styles.input}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            autoCapitalize='none'
                        />
                    </View>
                </View>

                

                <View style={ styles.inputBox}>
                    <Text style={styles.label_text}>Password</Text>

                    <View style={styles.input_view}>

                        <FontAwesome name='key' size={16} color={COLORS.black}/>

                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            style={styles.input}
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

                <View style={styles.inputBox}>
                    <Text style={styles.label_text}>Confirm Password</Text>

                    <View style={styles.input_view}>
                    <FontAwesome name='key' size={16} color={COLORS.black}/>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            onChangeText={text => setConfirmPassword(text)}
                            value={confirmPassword}
                            style={styles.input}
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

      </View>

      {isSubmit ? 
 <ActivityIndicator size={30} color={COLORS.secondary} style ={{marginTop : 10}}/>
:

                <Button
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                        marginHorizontal : 20
                    }}
                    onPress = {handleSignup}
                />

      }
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View> */}

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    
{/* 
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={icons.google}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity> */}
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("LogIn")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.secondary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
            </View>
            
        </ScrollView>
    )
}

export default Signup;



const styles = StyleSheet.create({
  container:{
      flex: 1,
       backgroundColor: COLORS.white 
    },
label_text:{
  fontSize: 16,
  fontWeight: '400',
  marginVertical: 5
}
    ,
    input: {
        width : '100%',
        marginLeft : 5,
        color:'#000'
      },


  inputBox: {
     marginBottom: 8 
  },
  errorMessage: {
    marginTop : 5 ,
    color: 'red',
    marginBottom: 7,
    fontWeight : 'bold'
  },
  input_view :{
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

