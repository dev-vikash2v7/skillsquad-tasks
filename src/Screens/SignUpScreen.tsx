import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLORS, fontSize } from '../Constants/theme';

import Button from '../Components/Button';

import { ActivityIndicator } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScaledSheet } from 'react-native-size-matters';


const Signup = ({navigation} ) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmit , setIsSubmit] = useState(false)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

      







      
        const handleSignup = async() => {

          if (!name || !email || !password || !confirmPassword || !password ) {
            setErrorMessage('Please fill all the fields !');
            return;
          }
      
          if (password !== confirmPassword) {
            setErrorMessage('Passwords did not match !');
            return;
          }
        setIsSubmit(true)

          try {
         

            await auth().createUserWithEmailAndPassword(email, password);

            setErrorMessage('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setName('')

            navigation.navigate('MainTabs');

            
          }
          
          catch (error) {
            setErrorMessage( error.message);

            if(error.message.includes('already')){
                setErrorMessage('Email address is already in use by another account ! Try with another id .');
            }
           else if(error.message.includes('badly')){
                setErrorMessage('The email address is badly formatted.');
            }
           else if(error.message.includes('weak')){
                setErrorMessage('Password should be at least 6 characters !');
            }
            else{
                setErrorMessage(error.message);
            }


          }
          setIsSubmit(false)

        };
      
  
    return (
        <ScrollView style={styles.container}>

            <View style={{ flex: 1, marginHorizontal: 22 }}>

                <View style={  { marginTop: 5 }}>

                    <View style = {{alignItems:'center' , flexDirection:'row',justifyContent :'space-between'}}>

                    <Text style={{

                        fontSize: 22,
                        fontWeight: 'bold',
                        color: COLORS.black,
                        marginTop:12
                    }}>
                        Create Account
                    </Text>


                    </View>

                 
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

<View style={styles.errorBox}>
<Text style={styles.errorText}>{errorMessage}</Text>
</View>
       }

      </View>

      {isSubmit ? 
 <ActivityIndicator size={30} color={COLORS.primary} style ={{marginTop : 10}}/>
:

                <Button
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 40,
                        marginBottom: 4,
                        marginHorizontal : 20
                    }}
                    onPress = {handleSignup}
                />

      }
              

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    

                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account ? </Text>
                    <Pressable
                        onPress={() => {
                            setErrorMessage('')
                            setEmail('')
                            setPassword('')
                            setConfirmPassword('')
                            setName('')
                            navigation.navigate("LogIn")
                        }}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6,
                            textDecorationLine:'underline'

                        }}>Login</Text>
                    </Pressable>
            </View>
            
        </ScrollView>
    )
}

export default Signup;



const styles = ScaledSheet.create({
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
},
errorBox: {
    backgroundColor: '#ffebee',
    padding: '10@ms',
    borderRadius: '5@ms',
    marginVertical: '10@vs'
  },
  errorText: {
    color: '#d32f2f',
    fontSize: fontSize.regular,
  },
});

