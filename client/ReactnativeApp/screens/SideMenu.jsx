import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Button, ChevronLeftIcon, Flex, Heading, Icon, ScrollView, Stack, useDisclose } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { save_tokens_constant } from '../utils/constants';
import { authAction } from '../store/slice/user_slice';

const SideMenu = () => {

  const [userData, setUserData] = useState('');
  const stateData = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    if (stateData.profile) {
      setUserData(stateData.profile);
    }
  }, [stateData]);



  const Logout = async () => {
    try {
      const auth_token = await AsyncStorage.getItem(save_tokens_constant);
      if (auth_token) {
        await AsyncStorage.removeItem(save_tokens_constant);
        dispatch(authAction({ auth: false, profile: "" }));
      }
      console.log("Auth Token:", auth_token);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navigation = useNavigation()
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() =>navigation.navigate("Home")} ><MaterialIcons name="keyboard-arrow-left" size={40}  /></TouchableOpacity>
        <Heading size="md" fontWeight="600" color="#102C57">
          Profile
        </Heading>
      </View>
     <ScrollView>
     <View style={styles.profile}>
        <Avatar
          style={{ marginTop: 25 }}
          size="2xl"
          source={{
            uri: userData.profileImage,
          }}
        />
        <Heading size="lg" fontWeight="600" color="#102C57">
          {userData.full_name}
        </Heading>
        <Text>
        {userData.email?.slice(0, 10)}
        
        </Text>
        <Button
            mt={1}
            variant="outline"
            borderColor="#0C2D57"
            _text={{ color: "#0C2D57" }}
            onPress={() => navigation.navigate('EditProfile')}
          >
            Edit Profile
          </Button>
      </View>
      <View style={{marginTop:20}}>
      <Heading marginLeft="5"marginBottom="5"  size="md" fontWeight="600" color="#102C57">
    WorkSpace         
    </Heading>
        <Button padding={4}
          style={styles.menuButton}
          backgroundColor="transparent"
          borderColor="gray"
          borderWidth={1}
        >
          <Flex direction="row" alignItems="center" justifyContent="space-between" width="100%">
            <Heading  size="md" fontWeight="600" color="#102C57">
              ui design
            </Heading>
            <TouchableOpacity style={{ borderWidth: 1, paddingHorizontal: 30, paddingVertical: 10, borderRadius: 10, borderColor: "#B1AFFF" }}>
              <Text>invite</Text>
            </TouchableOpacity>
          </Flex>
        </Button>
      </View>
      <View>
      <Heading marginLeft="5"marginBottom="5" marginTop="5"  size="md" fontWeight="600" color="#102C57">
      Manage         
      </Heading>
      <View style={{ flexDirection: 'row',gap:12,marginHorizontal:30 }}>
      <Button
        style={{
          width: "50%",
          backgroundColor: 'transparent',
          borderWidth:1,
          borderColor:"#EEEDEB",borderRadius:20
        }}
        leftIcon={
            <Heading marginLeft="5"marginBottom="5" marginTop="5"  size="md" fontWeight="600" color="#102C57">
            Manage         
            </Heading>
        }
      >
      <TouchableOpacity style={{ padding: 5,paddingHorizontal:8, borderRadius: 4 ,borderWidth:1, borderColor:"#EEEDEB"
       }}>
            <Text>4</Text>
          </TouchableOpacity>

      </Button>

      <Button
        style={{
          width: "50%",
          backgroundColor: 'transparent',
          borderWidth:1,
          borderColor:"#EEEDEB",
          marginRight:200,borderRadius:23
        }}
        leftIcon={
            <Heading marginLeft="5"marginBottom="5" marginTop="5"  size="md" fontWeight="600" color="#102C57">
           Label        
            </Heading>
        }
      >
      <TouchableOpacity style={{ padding: 5,paddingHorizontal:8, borderRadius: 4 ,borderWidth:1, borderColor:"#EEEDEB"
       }}>
            <Text>13</Text>
          </TouchableOpacity>

      </Button>
    </View>
    {/*  */}
    <View>
    <Button  onPress={Logout} style={{ backgroundColor: "#B1AFFF",borderRadius:20,marginHorizontal:30 }} mt="2" colorScheme="indigo">
            <Text style={{ color: "white", fontSize: 16 }}>Logout</Text>
            </Button>
    </View>

</View>
     </ScrollView>
</View>
)
}

const styles = StyleSheet.create({
    backButton: {
      flexDirection: "row",
      gap: 100,
      alignItems: "center",
      margin: 10
    },
    profile: {
      alignItems: "center",
      gap:3
    },
    menuButton: {
      borderColor:"#EEEDEB",
      borderRadius: 10,
      marginHorizontal: 20
    }
  })
export default SideMenu