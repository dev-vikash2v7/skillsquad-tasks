import { Dimensions } from "react-native";

const {   height} = Dimensions.get('screen')

const COLORS = {
    white: "#FFFFFF",
    black: "#222222",

    primary: "#4CAF50",

    grey: "#CCCCCC",

  

    text: '#333333',
    success : '#4CAF50',
    error : '#FF5252',




  };
  

  
  const fontSize = {
    small: ( height ) / 70,
    regular: ( height ) / 55,
    large: ( height ) / 40,
    extralarge:( height ) / 30
} 
  
  
 
 
  export { COLORS, fontSize};