import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {  Text } from 'react-native-paper';
import { View  ,Button} from 'react-native';

const App = () => {

  const [videoCall, setVideoCall] = useState(false);
  const connectionData = {appId: '3fa24139fc264ec79031b76d190a86a1', channel: 'test'};


  const rtcCallbacks = {
    EndCall: () => setVideoCall(false)
    };
  return videoCall ? <AgoraUIKit 
  connectionData={connectionData}
   rtcCallbacks={rtcCallbacks} 
   /> : 

   <View style={{justifyContent:'center' , alignItems:'center' , alignContent:'center' , flex:1}}>
   <Button title='Join Video Call' onPress={()=>setVideoCall(true)}>
   </Button>
   </View>
   ;
};

export default App;