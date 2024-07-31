import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Button, FormControl, HStack, Input, ScrollView } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { create_Task_service } from '../services/Task_Service';
import { getTeamService } from '../services/Team_Service';
import { apiHandle } from '../config/ApiHandle';

const AddTask = () => {
  const navigation = useNavigation();
  const [members, setMembers] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [allTeam, setAllTeam] = useState([]);
  const [data, setData] = useState('');
  const color = "#CCD3CA";

  const list = ["urgent", "running", "ongoing"];

  const handlePress = (index) => {
    setSelectedItem(index);
  };

  const handleTeamSelect = async (team,id) => {
    console.log("id",id)
    try {
      const res = await apiHandle.get(`/team/${id}`);
      if(res){
        console.log("team does'nt exist")
      }
      console.log("creatorUserId",res.data.data.user)
    setData((prev) => ({ ...prev, ["creatorUserID"]: res.data.data.user }))
    setData((prev) => ({ ...prev, ["teamID"]: id }))
    setData((prev) => ({ ...prev, ["assignedToTeam"]: id }))
      
    } catch (error) {
      console.log({error})
    }
    // console.log("handleTeamSelect",team)
    setSelectedTeam(team);
    await get_user(team.members);
  };

  const Submit = async () => {
    console.log("fulldata", data);
   try {
    const res =  await apiHandle.post('/task',data)
    if(res){
      console.log("res,",res.data)
      navigation.navigate("Home")
    }
   } catch (error) {
    console.log("error",error)
   }
  };
  

  const onChangeHandle = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    console.log("data",data)
  };

  const get_user = async (members) => {
    try {
      if (members.length > 0) {
        const userIdsParam = members.join(',');
        const res = await apiHandle.get(`/teamUser?ids=${userIdsParam}`);
        if (res && res.data && res.data.data) {
          const memberImages = res.data.data.reduce((acc, member) => {
            acc[member._id] = member.profileImage;
            return acc;
          }, {});
          setMembers((prevMembers) => ({ ...prevMembers, ...memberImages }));
          console.log("members", members);
        } else {
          console.log("API not working");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getTeamService();
        if (res) {
          console.log("res", res.data.data);
          const team = res.data.data;
          setAllTeam(team);

        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={{ margin: 20 }}>
            <ScrollView  showsVerticalScrollIndicator={false}>
     <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="keyboard-arrow-left" size={24} />
        </TouchableOpacity>
        <View style={{ alignItems: "center" ,marginRight:120}}>
          <Text style={{ fontSize: 19, color: "#102C57" }}>Add Task</Text>
        </View>
      </View>

      <View style={{ margin: 15 }}>
        <FormControl>
          <FormControl.Label>
            <Text style={{ color: color, fontWeight: "bold" }}>Task Name</Text>
          </FormControl.Label>
          <Input
            onChangeText={(e) => onChangeHandle("name", e)}
            w={{ base: "100%", md: "25%" }}
            placeholder="Enter task name"
          />
        </FormControl>
      </View>

      <Text style={{ fontWeight: "bold" }}>Select team</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ flexDirection: "row" }}>
        {allTeam.map((item, index) => (
          <Button  key={index} onPress={() => handleTeamSelect(item,item._id)} style={{ marginRight: 10 ,backgroundColor: "#B1AFFF",color:"white"}}>
            <Text style={{color:"white"}}>{item.name}</Text>
          
          </Button>
        ))}
      </ScrollView>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 20, margin: 10, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10, color: "#CCD3CA" }}>Team Members</Text>
          <HStack justifyContent="center" space={2}>
            {selectedTeam && selectedTeam.members.map((memberId) => (
              <Avatar
                key={memberId}
                bg="cyan.500"
                source={{ uri: members[memberId] || 'https://via.placeholder.com/150' }}
              />
            ))}
          </HStack>
        </View>
        <View style={{ marginTop: 10 }}>
          <AntDesign name="pluscircleo" size={40} color="#CCD3CA" />
        </View>
      </View>

      <View style={{ margin: 15 }}>
        <FormControl>
          <FormControl.Label>
            <Text style={{ color: color, fontWeight: "bold" }}>Task progress</Text>
          </FormControl.Label>
          <Input
            onChangeText={(e) => onChangeHandle("progress", e)}
            w={{ base: "100%", md: "25%" }}
            placeholder="Enter Task progress"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>
            <Text style={{ color: color, fontWeight: "bold" }}>dueDate</Text>
          </FormControl.Label>
          <Input
            onChangeText={(e) => onChangeHandle("dueDate", e)}
            w={{ base: "100%", md: "25%" }}
            placeholder="Enter dueDate"
          />
        </FormControl>
      </View>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Text style={{ color: color, fontSize: 20, marginLeft: 28 }}>Boards</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ flexDirection: 'row', paddingHorizontal: 10, marginTop: 15 }}>
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
        </ScrollView>
      </View>

      <View style={{ alignItems: "center" }}>
        <Button onPress={Submit} style={{ backgroundColor: "#B1AFFF", borderRadius: 10, marginTop: 10, width: "70%" }} mt="2" colorScheme="indigo">
          <Text style={{ color: "white", fontSize: 16 }}>Save</Text>
        </Button>
      </View>
     </ScrollView>
    </View>
  );
};

export default AddTask;
