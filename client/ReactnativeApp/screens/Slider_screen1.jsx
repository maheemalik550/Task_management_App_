import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Heading } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';


const Slider_screen1 = () => {
const data = useSelector((state)=>state.auth)
console.log("data",data)

  const navigation = useNavigation()
  return (
    <View>
     <Image source={require('../images/image2.jpeg')}/>
  <View style={{backgroundColor:"#F5F7F8"}}>
  <View style={{marginLeft:40,gap:4}}>
    <Text style={{color:"#B1AFFF",fontSize:20}}>Task Management</Text>
    <Heading size="xl">Let's create a</Heading>
    <View style={{flexDirection:"row"}}><Heading  color={"#B1AFFF"} size="xl">space</Heading><Heading size="xl"> for your </Heading></View>
    <Heading size="xl">Work flow</Heading>
     </View>
     <View>
     </View>
   
        <View style={{flexDirection:"row",gap:10,height:150}}>
          <View style={{width:"60%"}} >
            <TouchableOpacity onPress={()=>navigation.navigate(data.auth ? "TabNavigation":"Signup")}>
            <Text  style={{color:"#B1AFFF",fontWeight:"bold",fontSize:25,marginLeft:40,marginTop:30}}>Skip</Text>
            </TouchableOpacity>
          </View>
      <View style={{width:"50%"}}>
      <View style={{width:"100%",backgroundColor:"#B1AFFF",height:"100%",borderTopLeftRadius:100}}>
      <AntDesign onPress={()=>navigation.navigate("Slider_Screen2")} style={{marginLeft:50,marginTop:50}}  size={40} name="arrowright" color="white"/>
      </View>
      </View>
      </View>
     </View>
     </View>



  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#b3c7f9',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#0a7df3',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: 'transparent',
  },
  skipText: {
    fontSize: 16,
    color: '#0a7df3',
  },
  nextButton: {
    backgroundColor: '#0a7df3',
    borderRadius: 20,
    padding: 10,
  },
});





export default Slider_screen1