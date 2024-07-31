import { View, Text, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, Heading } from 'native-base'
import { useNavigation } from '@react-navigation/native';

const Slider_Screen2 = () => {
  const navigation = useNavigation()
  return (
        <View style={{backgroundColor:"#F5F7F8"}}>
         <Image source={require('../images/image3.jpeg')}/>
         <View style={{marginLeft:40,gap:4,marginTop:30}}>
        <Text style={{color:"#B1AFFF",fontSize:20}}>Task Management</Text>
        <Heading size="xl">Work more</Heading>
        <View style={{flexDirection:"row",gap:10}}><Heading  color={"#B1AFFF"} size="xl">Structured</Heading><Heading size="xl">and</Heading></View>
        <Heading size="xl">Organized</Heading>
    
    
         </View>
         <View>
         </View>
         <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <View style={{marginTop:70,marginLeft:12}}><Text style={{color:"#B1AFFF",fontWeight:"bold",fontSize:1}}>Skip</Text></View>
        <View style={{backgroundColor:"#B1AFFF",height:200,width:120,marginLeft:240,marginTop:10,borderTopStartRadius:100}}>
            <AntDesign onPress={()=>navigation.navigate("Slider_screen3")} style={{marginLeft:50,marginTop:50}} size={40} name="arrowright" color="white"/>
         </View>
        </View>
        </View>
  )
}

export default Slider_Screen2