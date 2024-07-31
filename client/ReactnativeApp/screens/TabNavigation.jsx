import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Actionsheet, Button, Flex, Heading, HStack, Icon, IconButton, Switch, useDisclose } from 'native-base'; // Assuming you're using native-base for Actionsheet
import Home from './Home';
import Profile from './Profile';
import Chat from './Chat';
import Task_Status from './Task_Status';
import Add from './Add';
import Project from './Project';


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const handleButtonPress = () => {
    Alert.alert(`Navigate to ${item.name}`);
  };
  const navigation = useNavigation()
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
  
     <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
            borderTopWidth: 1,
            borderTopColor: '#E5E5E5', 
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={'#B1AFFF'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Task_Status"
          component={Task_Status}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="addfolder" color={'#B1AFFF'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={Add}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={onOpen}
                style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}
              >
                <AntDesign name="pluscircle" color={'#B1AFFF'} size={50} style={{ marginBottom: 10 }} />
              </TouchableOpacity>
            ),
          }}
        />
         <Tab.Screen
          name="Project"
          component={Project}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="tasks" color={'#B1AFFF'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user-o" color={'#B1AFFF'} size={size} />
            ),
          }}
        />
      </Tab.Navigator>

      {/* ActionSheet */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={() =>navigation.navigate('')}>     
          <View>
                <Button onPress={()=>navigation.navigate('AddTask')}
                    style={styles.menuButton}

                    colorScheme="indigo"
                >
                    <Flex direction="row" justifyContent="space-between" width="100%">
                        <Heading size="md" fontWeight="600" color="#102C57">
                           Create Task
                        </Heading>
                       <View>
                    <FontAwesome name='pencil-square-o' size={30} color="#102C57" />
                      
                  </View>
                    </Flex>
                </Button>
            </View>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => console.log('Option 2 selected')}>
          <View>
                <Button onPress={()=>navigation.navigate('AddProject')}
                    style={styles.menuButton}
                    colorScheme="indigo"
                >
                    <Flex direction="row" justifyContent="space-between" width="100%">
                        <Heading size="md" fontWeight="600" color="#102C57">
                           Create Project
                        </Heading>
                       <View>
                    <Feather name='plus-square' size={30} color="#102C57" />
                      
                  </View>
                    </Flex>
                </Button>
            </View>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => console.log('Option 3 selected')}>
          <View>
                <Button
                onPress={()=>navigation.navigate('Create_Team')}
                    style={styles.menuButton}
                    colorScheme="indigo"
                >
                    <Flex direction="row" justifyContent="space-between" width="100%">
                        <Heading size="md" fontWeight="600" color="#102C57">
                           Create Team
                        </Heading>
                       <View>
                       <Octicons name='people' size={30} color="#102C57" />
                      
                  </View>
                    </Flex>
                </Button>
            </View>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => console.log('Option 4 selected')}>
          <View>
                <Button
                    style={styles.menuButton}
                    onPress={() =>navigation.navigate("Setting")}
                    colorScheme="indigo"
                >
                    <Flex direction="row" justifyContent="space-between" width="100%">
                        <Heading size="md" fontWeight="600" color="#102C57">
                           Setting
                        </Heading>
                       <View>
                    <AntDesign name='clockcircleo' size={30} color="#102C57" />
                      
                  </View>
                    </Flex>
                </Button>
            </View>
          </Actionsheet.Item>
        <Actionsheet.Item onPress={onClose} style={{ alignItems:"center" }}>
          <IconButton onPress={onClose} m={'8px'} borderRadius="full" bg='#B1AFFF' variant="solid" p="3" icon={<Icon color="white" name='cross' as={Entypo} size="lg" />} />
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
     </>
     
  );
};


const styles = StyleSheet.create({
  header: {
      flexDirection: 'row',
      gap: 100,
      // justifyContent: 'space-between',
      alignItems: 'center',
  }, headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: "#102C57",
  },
  menuButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "#EEEDEB",
      borderRadius: 20,
      width: "100%",
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
  },
})


export default TabNavigation;
