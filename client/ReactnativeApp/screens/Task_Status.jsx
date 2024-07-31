import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { VStack } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Svg, { Circle } from 'react-native-svg';
import TaskCard2 from '../Components/Task_card2';
import { useSelector } from 'react-redux';


const Task_Status = () => { 


  const tasks = [
    {
      title: 'Completed 📝',
      category: '18 tasks completed',
    },
    {
      title: 'Todo',
      category: '2 tasks now, 1 upcoming',
    },
    {
      title: 'In Progress',
      category: '2 tasks now, 1 starting',
    },
  ];

  const percentage = 70;
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  const [selectedItem, setSelectedItem] = useState(null);
  const list = ["Favourite", "Recents", "All"];

  const handlePress = (index) => {
    setSelectedItem(index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="keyboard-arrow-left" size={24} />
        <Text style={styles.headerTitle}>Projects</Text>
        <AntDesign name="pluscircleo" size={24} />
      </View>
      <View style={styles.container3}>
        <Svg height="120" width="120" viewBox="0 0 120 120">
          <Circle
            stroke="orange"
            fill="none"
            cx="60"
            cy="60"
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke="#667BC6"
            fill="none"
            cx="60"
            cy="60"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.text}>{`${percentage}%`}</Text>
      </View>
      {/* <ScrollView 
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
            onPress={() => handlePress(index)}
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
      </ScrollView> */}
<View style={{flexDirection:"row",gap:50,marginLeft:20}}>
    <View style={{flexDirection:"row",gap:5,alignItems:"center"}}><Text style={{color:"#667BC6",fontSize:20,fontWeight:"bold"}}>.</Text><Text>Completed</Text></View>
    <View style={{flexDirection:"row",gap:5,alignItems:"center"}}><Text style={{color:"orange",fontSize:20,fontWeight:"bold"}}>.</Text><Text>InProgress</Text></View>
</View>
    <View style={{marginTop:10}}>
        <Text style={{fontWeight:"bold",marginLeft:10}}>Monthly</Text>
    <VStack space={3}>
        {tasks.map((task, index) => (
          <TaskCard2 key={index} {...task} />
        ))}
      </VStack>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#102C57",
  },
  container3: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  text: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#102C57',
  },
});

export default Task_Status;
