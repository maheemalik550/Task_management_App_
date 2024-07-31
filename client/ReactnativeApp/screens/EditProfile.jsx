import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar, FormControl, Input, Link } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateProfileData } from '../services/auth_service';
import { authAction } from '../store/slice/user_slice';
 // Assuming you have an action to update the user profile

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const userData = useSelector((state) => state.auth.profile);
  const [updateData, setUpdateData] = useState({
    full_name: userData.full_name,
    email: userData.email,
    phone_number: userData.phone_number,
    profileImage: userData.profileImage,
  });

  const onChangeHandle = (field, value) => {
    setUpdateData((prev) => ({ ...prev, [field]: value }));
  };

  const ImageFromGallery = async () => {
    try {
      const result = await launchImageLibrary({ includeBase64: false, mediaType: 'photo' });
      if (!result.didCancel) {
        const selectedImageUri = result.assets[0].uri;
        setUpdateData((prev) => ({ ...prev, profileImage: selectedImageUri }));
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSave = async() => {
   try {
    const res = await updateProfileData(updateData)
    if(res){
      dispatch(authAction({auth:true,profile:res.data.user}))
      navigation.navigate("Home")
    }
   } catch (error) {
    console.log({error})
   }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="keyboard-arrow-left" size={24} />
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={{color:'#B1AFFF',fontSize:16}}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={ImageFromGallery}>
          <Avatar style={styles.avatar}
            size="2xl"
            source={{ uri: updateData.profileImage }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <FormControl>
          <FormControl.Label>Full Name</FormControl.Label>
          <Input
            padding={3}
            borderRadius={15}
            value={updateData.full_name}
            onChangeText={(e) => onChangeHandle("full_name", e)}
            placeholder="Enter your full name"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            padding={3}
            borderRadius={15}
            value={updateData.email}
            onChangeText={(e) => onChangeHandle("email", e)}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Phone Number</FormControl.Label>
          <Input
            padding={3}
            borderRadius={15}
            value={updateData.phone_number}
            onChangeText={(e) => onChangeHandle("phone_number", e)}
            placeholder="Enter your phone number"
          />
        </FormControl>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
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
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    marginTop: 25,
  },
  form: {
    gap: 20,
  },
});

export default EditProfile;
