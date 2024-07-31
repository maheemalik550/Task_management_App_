import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Box, FlatList, Input, HStack, VStack, Spacer } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { apiHandle } from '../config/ApiHandle';

const Chat = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [alluser, setAlluser] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiHandle.get("users");
        if (res) {
          console.log(res.data);
          setAlluser(res.data);
          setFilteredData(res.data);
        }
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

 

  return (
    <View style={{ margin: 20 }}>
      <View style={{ flexDirection: "row", gap: 100 }}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <MaterialIcons name="keyboard-arrow-left" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 19, color: "#102C57" }}>Chats</Text>
        </View>
      </View>
      {/* Search Input */}
      <View style={{ marginTop: 40 }}>
        <Input
          style={{ borderRadius: 2000 }}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          InputLeftElement={<Feather name="search" size={30} color="gray" style={{ backgroundColor: "#F5F7F8", marginLeft: 10 }} />}
        />
      </View>
      {/* Chat List */}
      <View style={{ marginTop: 25 }}>
        <Box>
          <FlatList
            data={alluser}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                borderColor="#CCD3CA"
                pl={["0", "4"]}
                pr={["0", "5"]}
                py="2"
              >
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar size="48px" source={{ uri: item.profileImage }} />
                  <VStack>
                    <Text
                      color="coolGray.800"
                      bold
                    >
                      {item.full_name}
                    </Text>
                    <Text
                      color="coolGray.600"
                    >
                      {item.recentText}
                    </Text>
                  </VStack>
                  <Spacer />
                </HStack>
              </Box>
            )}
            keyExtractor={item => item.id}
          />
        </Box>
      </View>
    </View>
  );
}

export default Chat;
