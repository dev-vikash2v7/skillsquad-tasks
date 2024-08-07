import React,{useState} from 'react'
import { View, Text , StyleSheet  , Image } from 'react-native'
import { COLORS, fontSize } from '../Constants/theme';

export default function Header() {


  return (
    <View style = {styles.container}> 


      <Text style={styles.title} >SkillSquad Task</Text>



    </View>
  );
}

const styles = StyleSheet.create({
container :{
  backgroundColor:'whitesmoke' , 
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical : 10,
  elevation: 4,
  shadowColor : 'blue',
  justifyContent:'center'
},

 

  title: {
    fontSize: fontSize.large,
    color: COLORS.text, 
    textAlign:'center',
    fontWeight:'600'
  },
  
})
