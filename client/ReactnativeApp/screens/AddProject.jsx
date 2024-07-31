import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Button, FormControl, HStack, Input, ScrollView, VStack } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { create_Task_service } from '../services/Task_Service';
import { create_Project_service } from '../services/Project_servise';


const AddProject = () => {
  const navigation = useNavigation()
  const [selectedItem, setSelectedItem] = useState(null);
const [Data, setData] = useState('')

  const list = [
    "urgent",
    "running",
    "ongoing"
]
const handlePress = (index,name) => {
  setSelectedItem(index);
};

const Submit = async()=>{
  console.log("data",Data)
  try {
  const res = await create_Project_service(Data)
  if(res){
    console.log(res.data.data)
  }
  } catch (error) {
    console.log({error})
  }
navigation.navigate("Project")
}

const onChangeHandle = (field,value)=>{
  setData((pre)=>({...pre,[field]:value}))
}

  const color = "#CCD3CA"
  return (
    <View style={{margin:20}}>
   
    <View style={{flexDirection:"row",gap:100}}>
    <View>
    <TouchableOpacity onPress={()=>navigation.navigate("Home")}><MaterialIcons name="keyboard-arrow-left" size={24} /></TouchableOpacity>
      </View>
      <View style={{alignItems:"center"}}>
      <Text style={{fontSize:19,color:"#102C57"}}>AddTask</Text>
      </View>
    </View>
 <View style={{marginTop:40}}>
 <View style={{margin:15}}>
    <FormControl>
              <FormControl.Label ><Text style={{color:color,fontWeight:"bold"}}>Task Name</Text> </FormControl.Label>
              <Input   onChangeText={(e) => onChangeHandle("name", e)}
                w={{ base: "100%", md: "25%" }}
    
                placeholder="Enter task name"
              />
            </FormControl>
    </View>

  <View style={{margin:15}}>
    <FormControl>
              <FormControl.Label ><Text style={{color:color,fontWeight:"bold"}}>Task Description</Text> </FormControl.Label>
              <Input   onChangeText={(e) => onChangeHandle("Description", e)}
                w={{ base: "100%", md: "25%" }}
    
                placeholder="Enter Task Description"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label ><Text style={{color:color,fontWeight:"bold"}}>status</Text> </FormControl.Label>
              <Input   onChangeText={(e) => onChangeHandle("status", e)}
                w={{ base: "100%", md: "25%" }}
    
                placeholder="Enter status"
              />
            </FormControl>
    </View>

    <View style={{marginTop:10,marginBottom:10}}>
      <Text style={{color:color,fontSize:20,marginLeft:28}}>Boards</Text>
    <ScrollView   showsHorizontalScrollIndicator={false}
  horizontal 
  style={{ 
    flexDirection: 'row', 
    paddingHorizontal: 10, 
    marginTop: 15 
  }}
>
  {list.map((name, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => handlePress(index,name)}
      style={{
        marginRight: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: selectedItem === index ? 1 : 0,
        borderColor: selectedItem === index ? '#B1AFFF' : 'transparent',
      }}
    >
      <Text>{name}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>
    </View>
   <View style={{alignItems:"center"}}>
   <Button onPress={Submit} style={{ backgroundColor: "#B1AFFF",borderRadius:10,marginTop:10 ,width:"70%"}} mt="2" colorScheme="indigo">
          <Text style={{ color: "white", fontSize: 16 }}>Save</Text>
            </Button>
   </View>
 </View>
    </View>
    
  )
}

export default AddProject