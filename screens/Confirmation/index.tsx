import { Text, Surface} from '@react-native-material/core';
import React from 'react';
import { View, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const Confirmation = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            padding:20,
            backgroundColor: '#292929',
            alignItems: 'center',
            justifyContent: 'center',
       
            
          },
    })
    return <View style={style.container}>
        <Surface
         style={{width:"95%", marginBottom:100, 
         marginTop:40,
         borderRadius:10,height: 200, backgroundColor:"#121212", alignItems:"center", justifyContent:"space-around"}}
        >
        <Text color='white' style={{fontSize:30, margin:0}}>
            Confirmation
        </Text>
        <Text color='white' style={{fontSize:12, margin:0}}>Email confirmation has been sent!</Text>
        <AntDesign name="checkcircleo" size={50} style={{margin:0}} color="green" />
        </Surface>
     
    </View>;
}
 
export default Confirmation;