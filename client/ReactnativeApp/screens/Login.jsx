import { View, Text, ActivityIndicator, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Box, Center, FormControl, Heading, HStack, Icon, Input, Link, VStack, Button, ScrollView, IconButton, Alert } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { login_service, check_auth_service } from '../services/auth_service';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../store/slice/user_slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { save_tokens_constant } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const onChangeHandle = (field, value) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log("data", loginData);
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await login_service(loginData);

      if (res) {
        const access_token = res.data.access_token;
        await AsyncStorage.setItem(save_tokens_constant, access_token);

        const userProfile = await check_auth_service(access_token);
        console.log("userProfile",userProfile.data.data)
        dispatch(authAction({ auth: true, profile: userProfile.data.data }));
        navigation.navigate('TabNavigation');
      }
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage('Please enter correct credentials');
      console.log({ error });
    }
  };

  return (
    <>
      <View style={{ flexDirection: "row", gap: 110, margin: 20 }}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <MaterialIcons name="keyboard-arrow-left" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 19, color: "#102C57" }}>Login</Text>
        </View>
      </View>
      <View style={{ marginTop: 30, justifyContent: "center", marginTop: 70 }}>
        <ScrollView>
          <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading size="lg" fontWeight="600" color="#102C57">
                Welcome
              </Heading>
              <Heading mt="1" color="#939185" fontWeight="medium" size="xs">
                Please enter your email address and password to login
              </Heading>

              {errorMessage ? (
                <Alert w="100%" status="error" mb={5}>
                  <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} justifyContent="space-between">
                      <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                        <Text fontSize="md" color="coolGray.800">
                          {errorMessage}
                        </Text>
                      </HStack>
                      <IconButton
                        variant="unstyled"
                        _focus={{ borderWidth: 0 }}
                        icon={<Icon name="close" />}
                        _icon={{ color: "coolGray.600" }}
                        onPress={() => setErrorMessage('')}
                      />
                    </HStack>
                  </VStack>
                </Alert>
              ) : null}

              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Email ID</FormControl.Label>
                  <Input
                    variant="rounded"
                    onChangeText={(e) => onChangeHandle("email", e)}
                    w={{ base: "100%", md: "25%" }}
                    InputLeftElement={
                      <Icon as={<MaterialCommunityIcons name="email" />} size={5} ml="2" color="#B1AFFF" />
                    }
                    placeholder="Email ID"
                    p={3}
                    borderRadius={10}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    variant="rounded"
                    onChangeText={(e) => onChangeHandle("password", e)}
                    w={{ base: "100%", md: "25%" }}
                    type={show ? "text" : "password"}
                    InputLeftElement={
                      <Pressable onPress={() => setShow(!show)}>
                        <Icon as={<FontAwesome5 name={show ? "eye" : "eye-slash"} />} size={5} mr="2" style={{ marginLeft: 10 }} color="#B1AFFF" />
                      </Pressable>
                    }
                    placeholder="Password"
                    p={3}
                    borderRadius={10}
                  />
                </FormControl>
                <Button borderRadius={10} p={3} onPress={handleSubmit} style={{ backgroundColor: "#B1AFFF" }} mt="2" colorScheme="indigo">
                  {isSubmitting ? <ActivityIndicator color="white" /> : <Text style={{ color: "white", fontSize: 16 }}>Login</Text>}
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text style={{ fontSize: 14, color: "coolGray.600" }}>
                    Already have an Account.{" "}
                  </Text>
                  <Link
                    onPress={() => navigation.navigate("Signup")}
                    _text={{ color: "#B1AFFF", fontWeight: "medium", fontSize: "sm" }}
                    href="#"
                  >
                    Sign in
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </ScrollView>
      </View>
    </>
  );
}

export default Login;
