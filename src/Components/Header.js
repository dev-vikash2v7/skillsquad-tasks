import React,{useState} from 'react'
import { View, Text , StyleSheet  , Image } from 'react-native'
import {COLORS } from '../../../constants/theme';
import icons from '../Constants/icons';
import { fontSize } from '../Constants/theme';

export default function Header() {


  return (
    <View style = {styles.container}> 


      <View style = { styles.logoBox}>
           <Image
        source={icons.logo} 
        style={styles.logo}
      />
      </View>

      <Text style={styles.title} >SkillsSquad</Text>



    </View>
  );
}

const styles = StyleSheet.create({
container :{
  backgroundColor:COLORS.primary , 
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical : 10,
  elevation: 4,
  shadowColor : 'blue'
},

  logoBox : {
    width : 55 ,
    height :55 ,
    backgroundColor : 'white' ,
     borderRadius : 50 ,
     marginRight : 10 ,
    elevation : 4 ,
    marginRight: 10,
  shadowColor : 'black'

  },

  logo: {
    resizeMode :'contain' ,
    width: 50,
    height : 50 ,
    justifyContent :'center',
    alignItems:'center',
  },

  title: {
    fontSize: fontSize.large,
    color: COLORS.text, 
    fontFamily : 'lora_bold',
  },
  
})
