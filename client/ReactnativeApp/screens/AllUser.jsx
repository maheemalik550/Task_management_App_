import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Box, FlatList, Input, HStack, VStack, Spacer } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { useNavigation } from '@react-navigation/native';
import { get_all_user } from '../services/auth_service';
import { useDispatch } from 'react-redux';
import { Selected_members } from '../store/slice/user_slice';

const Alluser = () => {
  const navigation = useNavigation();
const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await get_all_user();
        if (res) {
          setFilteredData(res.data);
          // console.log("Filtered Data", res.data);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    getAllUsers();
  }, []);

  const handleChange = (item) => {
    console.log('Selected User:', item);
    setMembers((prevMembers) => {
      const newMembers = [...prevMembers, item];
      // console.log('All Members:', newMembers);  
      return newMembers;
    });
  };

  useEffect(() => {
    console.log('Updated Members:', members);
  }, [members]);

  const SaveHandle = ()=>{
    dispatch(Selected_members(members))
    navigation.navigate('Create_Team')
  } 

  return (
    <View style={{ margin: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="keyboard-arrow-left" size={24} />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 19, color: "#102C57" }}>All Users</Text>
        </View>
        <View>
         <TouchableOpacity onPress={SaveHandle}><Text>Save</Text></TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <Input
          style={{ borderRadius: 2000 }}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          InputLeftElement={<Feather name="search" size={30} color="gray" style={{ backgroundColor: "#F5F7F8", marginLeft: 10 }} />}
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <Box>
          <FlatList
            data={filteredData.filter(item =>
              item.full_name.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleChange(item)}>
                <Box
                  key={index}
                  borderBottomWidth="1"
                  borderColor="#CCD3CA"
                  pl={["0", "4"]}
                  pr={["0", "5"]}
                  py="2"
                >
                  <HStack space={[2, 3]} justifyContent="space-between">
                    <Avatar size="48px" source={{ uri: item.profileImage }} />
                    <VStack>
                      <Text color="coolGray.800" bold>
                        {item.full_name}
                      </Text>
                      <Text color="coolGray.600">
                        {item.recentText}
                      </Text>
                    </VStack>
                    <Spacer />
                    <TouchableOpacity>
                      <FontAwesome6 name="circle-dot" size={24} />
                    </TouchableOpacity>
                  </HStack>
                </Box>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          />
        </Box>
      </View>
    </View>
  );
};

export default Alluser;
