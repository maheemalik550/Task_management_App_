import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Button, FlatList, FormControl, HStack, Input, ScrollView } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createTeamService } from '../services/Team_Service';  // Ensure this import is correct

const Create_Team = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const StateData = useSelector((state) => state.auth.members);
  const navigation = useNavigation();

  const [data, setData] = useState({
    name: '',
    type: '',
    members: []
  });

  useEffect(() => {
    if (StateData) {
      const userIds = StateData.map(member => member._id);
      setData(prevData => ({ ...prevData, members: userIds }));
    }
  }, [StateData]);

  const list = ["Private", "Public", "Secret"];

  const handlePress = (index) => {
    setSelectedItem(index);
  };

  const handlePress2 = (field, value) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  const Submit = async () => {
    console.log("Function is running");
    console.log("Data:", data);
    try {
      const res = await createTeamService(data);
      if (res) {
        console.log("Submitted successfully");
        console.log("Response data:", res.data);
        navigation.navigate("Home")
      } else {
        console.log("No response received from API");
      }
    } catch (error) {
     console.log({error})
    }
  };

  const color = "#CCD3CA";

  return (
    <View style={{ margin: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="keyboard-arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 19, color: "#102C57" }}>Create Team</Text>
      </View>

      <View style={{ marginTop: 25, alignItems: "center" }}>
        <View style={{ borderWidth: 1, padding: 15, borderRadius: 60, borderColor: "#B1AFFF" }}>
          <Ionicons name="logo-stencil" size={80} color="#B1AFFF" />
        </View>
        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Text style={{ color: "#102C57" }}>Upload logo here</Text>
          <Text style={{ color: color }}>your logo will publish always</Text>
        </View>
      </View>

      <View style={{ margin: 15 }}>
        <FormControl>
          <FormControl.Label>
            <Text style={{ color: color, fontWeight: "bold" }}>Team Name</Text>
          </FormControl.Label>
          <Input
            onChangeText={(e) => handlePress2("name", e)}
            w={{ base: "100%", md: "25%" }}
            placeholder="Enter team name"
          />
        </FormControl>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 20, margin: 10, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10, color: "#CCD3CA" }}>Team Members</Text>
          <HStack justifyContent="center" mx={{ base: "auto", md: "0" }} space={2}>
            <View style={{ alignItems: "center" }}>
              {StateData ? (
                <FlatList
                  data={StateData}
                  horizontal
                  keyExtractor={(item) => item._id.toString()} // Ensure that each item has a unique key
                  renderItem={({ item }) => (
                    <View style={{ alignItems: "center", marginHorizontal: 5 }}>
                      <Avatar bg="green.500" mr="1" source={{ uri: item.profileImage }}>
                        {item.initials}
                      </Avatar>
                      <Text>{item.full_name}</Text>
                    </View>
                  )}
                />
              ) : null}
            </View>
          </HStack>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Alluser")}>
            <AntDesign name="pluscircleo" size={40} color="#B1AFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Text style={{ color: color, fontSize: 20, marginLeft: 28 }}>Type</Text>
        <View style={{ marginTop: 10 }}>
          <ScrollView horizontal style={{ flexDirection: 'row', paddingHorizontal: 10, marginTop: 15 }}>
            {list.map((name, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => { handlePress(index); handlePress2("type", name); }}
                style={{
                  marginRight: 20,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderColor: selectedItem === index ? '#B1AFFF' : '#CCD3CA',
                  borderRadius: 10,
                }}
              >
                <Text>{name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Button onPress={Submit} style={{ backgroundColor: "#B1AFFF", borderRadius: 10, marginTop: 10, width: "70%" }} mt="2" colorScheme="indigo">
          <Text style={{ color: "white", fontSize: 16 }}>Create Team</Text>
        </Button>
      </View>
    </View>
  );
};

export default Create_Team;
