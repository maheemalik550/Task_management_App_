import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Avatar, Heading, VStack, Button, ScrollView, Flex } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateProfileImage } from '../services/auth_service';
import { authAction } from '../store/slice/user_slice';
import { Loader } from '../Components/Loader';

const Profile = () => {
  const [updateImage, setUpdateImage] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.profile);
  const navigation = useNavigation();

  useEffect(() => {
    if (updateImage) {
      const updateProfile = async () => {
        const object = { profileImage: updateImage };
        const res = await updateProfileImage(object);
        if (res) {
          console.log({ res: res.data });
          console.log("update",res.data.user)
          dispatch(authAction({ auth: true, profile: res.data.user }));

        }
      };
      updateProfile();
    }
  }, [updateImage, dispatch]);

  const GalleryComponent = async () => {
    try {
      const result = await launchImageLibrary({ includeBase64: false, mediaType: 'photo' });
      if (!result.didCancel) {
        const selectedImageUri = result.assets[0].uri;
        setUpdateImage(selectedImageUri);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  if (!userData) {
    console.log("User data is null, showing loader...");
    return <Loader />;
  }

  const screenArray = [
    { name: "My Projects", link: "Project" },
    { name: "Join a Team", link: "Create_Team" },
    { name: "Settings", link: "Setting" },
    { name: "My Tasks", link: "TodayTask_Screen" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="keyboard-arrow-left" size={40} />
        </TouchableOpacity>
        <Heading size="md" fontWeight="600" color="#102C57">
          Profile
        </Heading>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <VStack style={styles.container} alignItems="center">
          <TouchableOpacity onPress={GalleryComponent}>
            <Avatar
              style={{ marginTop: 25 }}
              size="2xl"
              source={{
                uri: userData.profileImage || 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQIZC_H3agSf8paS0MT5ZqBtyvE3GBrmHhBtgYZ1MDs_XPAeVUG',
              }}
            />
          </TouchableOpacity>
          <Heading size="lg" fontWeight="600" color="#102C57">
            {userData.full_name}
          </Heading>
          <Text>{userData.email}</Text>
          <Button
            mt={1}
            variant="outline"
            borderColor="#0C2D57"
            backgroundColor="white"
            _text={{ color: "#0C2D57" }}
            onPress={() => navigation.navigate('EditProfile')}
          >
            Edit Profile
          </Button>

          <Flex direction="row" justify="space-around" width="100%">
            <View style={styles.infoBox}>
              <Heading size="md" fontWeight="600" color="#102C57">
                5
              </Heading>
              <Text style={styles.bioText}>On Going</Text>
            </View>
            <View style={styles.infoBox}>
              <Heading size="md" fontWeight="600" color="#102C57">
                25
              </Heading>
              <Text style={styles.bioText}>Completed</Text>
            </View>
          </Flex>

          {screenArray.map((item, index) => (
            <Button
              key={index}
              style={styles.menuButton}
              mt={4}
              onPress={() => navigation.navigate(item.link)}
              colorScheme="indigo"
            >
              <Flex direction="row" justifyContent="space-between" width="100%">
                <Heading size="md" fontWeight="600" color="#102C57">
                  {item.name}
                </Heading>
                <MaterialIcons name="keyboard-arrow-right" size={30} color="#102C57" />
              </Flex>
            </Button>
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  bioText: {
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  infoBox: {
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    width: "90%",
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
