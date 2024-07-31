import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Avatar, Box, Button, Heading, Progress } from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Loader } from '../Components/Loader';
import { getTeamService } from '../services/Team_Service';
import { apiHandle } from '../config/ApiHandle';
import Svg, { Circle } from 'react-native-svg';

const Home = () => {
  const [tasks, settasks] = useState([]);
  const navigation = useNavigation();
  const [members, setMembers] = useState({});
  const [check, setCheck] = useState(false);
  const data = useSelector((state) => state.auth.profile) || {};
  const [data1, setData1] = useState([]);
  const [teamName, setteamName] = useState('');
  const userData = useSelector((state) => state.auth.profile);
  console.log(userData)

  const showFunction = () => {
    setCheck(true);
  };

  const Handle_id = async (id, name) => {
    console.log("id", id);
    console.log("NAME", name);
    setteamName(name);
    try {
      const res = await apiHandle.get('gettask');
      if (res) {
        const filteredTasks = res.data.filter((item) => item.teamID === id);
        settasks(filteredTasks);
        console.log("task", tasks);
        console.log("Filtered tasks", filteredTasks);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
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
          } else {
            console.log("API not working");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getTeamsfunc = async () => {
      try {
        const res = await getTeamService();
        if (res && res.data && res.data.data) {
          const teams = res.data.data;
          setData1(teams);

          await Promise.all(teams.map(async (item) => {
            if (item.members.length > 0) {
              await get_user(item.members);
            }
          }));
        } else {
          console.log("team is empty");
        }
      } catch (error) {
        console.log({ error });
      }
    };

    getTeamsfunc();

    setTimeout(() => {
      showFunction();
    }, 3000);
  }, []);

  const strokeDashoffset_fun = (progress) => {
    const percentage = parseInt(progress, 10);
    const radius = 25;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    return circumference - (circumference * percentage) / 100;
  };

  return (
    check ? 
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("SideMenu")}>
              <Entypo name="sweden" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tuesday, 9</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <FontAwesome name="pencil-square-o" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.headingContainer}>
            <Text style={styles.welcomeText}>Welcome {data.full_name}</Text>
            <Heading size="lg" fontWeight="600" color="#102C57">
              Let's make a
            </Heading>
            <Heading size="lg" fontWeight="600" color="#102C57">
              habits together 🙌
            </Heading>
          </View>
         <ScrollView>
         <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={data1}
            keyExtractor={(item) => item._id}
            initialNumToRender={5}
            windowSize={10}
            renderItem={({ item }) => {
              const teamAvatars = item.members.map(memberId => (
                <Avatar
                  key={memberId}
                  bg="cyan.500"
                  source={{ uri: members[memberId] || 'https://via.placeholder.com/150' }}
                />
              ));

              return (
                <TouchableOpacity onPress={() => Handle_id(item._id, item.name)}>
                  <View style={styles.blueContainer}>
                    <View style={styles.innerContainer}>
                      <Heading size="lg" fontWeight="600" color="white">
                        {item.name}
                      </Heading>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 40 }}>
                        <View>
                          <Avatar.Group
                            _avatar={{ size: "md" }}
                            max={3}
                            mt={3}
                          >
                            {teamAvatars}
                          </Avatar.Group>
                        </View>
                        <View style={{ width: 60, paddingTop: 25 }}>
                          <Progress size="sm" mb={4} value={60} bg="white" />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <View style={styles.createAccountContainer}>
            <Heading size="lg" fontWeight="600" color="#102C57">
              Create Account
            </Heading>
            <TouchableOpacity onPress={() => navigation.navigate('TodayTask_Screen')}>
              <SimpleLineIcons name='arrow-right' size={30} color="#102C57" />
            </TouchableOpacity>
          </View>
          {tasks.map((task, index) => (
            <View key={index} style={styles.inProgressContainer}>
              <View>
                <Text>{task.name}</Text>
                <Heading size="md" fontWeight="400" color="#102C57">
                  {teamName}
                </Heading>
                <Text>{task.createdDate.slice(0, 10)}</Text>
              </View>
              <View style={styles.container2}>
                <Svg height="60" width="60" viewBox="0 0 60 60">
                  <Circle
                    stroke="#d3d3d3"
                    fill="none"
                    cx="30"
                    cy="30"
                    r="25"
                    strokeWidth="8"
                  />
                  <Circle
                    stroke="#3498db"
                    fill="none"
                    cx="30"
                    cy="30"
                    r="25"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 25}
                    strokeDashoffset={strokeDashoffset_fun(task.progress)}
                    strokeLinecap="round"
                  />
                </Svg>
                <Text style={styles.text}>{task.progress}</Text>
              </View>
            </View>
          ))}
         </ScrollView>




        </View>
      </ScrollView>
    </SafeAreaView> : <Loader size="medium" />
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#102C57",
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingContainer: {
    margin: 30,
  },
  welcomeText: {
    fontWeight: "bold",
    color: "#B1AFFF",
    fontSize: 30,
  },
  blueContainer: {
    margin: 20,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  innerContainer: {
    height: 200,
    padding: 40,
    width: '100%',
    backgroundColor: '#B1AFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  progressText: {
    color: 'white',
    marginLeft: 10,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 40,
    // marginTop: 20,
  },
  inProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 25,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Home;
