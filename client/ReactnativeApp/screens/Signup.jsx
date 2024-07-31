import { View, Text, ActivityIndicator, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Box, Center, FormControl, Heading, HStack, Icon, Input, Link, VStack, Button, ScrollView, CloseIcon, Alert, IconButton } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { signup_service } from '../services/auth_service';

const Signup = () => {
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandle = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null); // Clear previous errors
    try {
      const res = await signup_service(data);
      if (res) {
        navigation.navigate('Login'); // Navigate to Login on success
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <View style={{ flexDirection: "row", gap: 110, margin: 15 }}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Splash_screen")}>
            <MaterialIcons name="keyboard-arrow-left" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 19, color: "#102C57" }}>Signup</Text>
        </View>
      </View>
      <View>
        <ScrollView>
          <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading size="lg" fontWeight="600" color="#102C57">
                Create Account
              </Heading>
              <Heading mt="1" color="#939185" fontWeight="medium" size="xs">
                Please enter your information and create an account
              </Heading>
              {error && (
                <Alert w="100%" status="error">
                  <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} justifyContent="space-between">
                      <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                        <Text fontSize="md" color="coolGray.800">
                          {error}
                        </Text>
                      </HStack>
                      <IconButton
                        variant="unstyled"
                        _focus={{ borderWidth: 0 }}
                        icon={<CloseIcon size="3" />}
                        _icon={{ color: "coolGray.600" }}
                        onPress={() => setError(null)}
                      />
                    </HStack>
                  </VStack>
                </Alert>
              )}
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Full Name</FormControl.Label>
                  <Input
                    onChangeText={(e) => onChangeHandle("full_name", e)}
                    w={{ base: "100%", md: "25%" }}
                    InputLeftElement={
                      <Icon as={<Ionicons name="person" />} size={5} ml="2" color="#B1AFFF" />
                    }
                    placeholder="Enter your Full Name"
                    p={3}
                    borderRadius={10}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Phone Number</FormControl.Label>
                  <Input
                    variant="rounded"
                    onChangeText={(e) => onChangeHandle("phone_number", e)}
                    w={{ base: "100%", md: "25%" }}
                    InputLeftElement={
                      <Icon as={<Entypo name="phone" />} size={5} ml="2" color="#B1AFFF" />
                    }
                    placeholder="Enter Phone number"
                    p={3}
                    borderRadius={10}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Email ID</FormControl.Label>
                  <Input
                    variant="rounded"
                    onChangeText={(e) => onChangeHandle("email", e)}
                    w={{ base: "100%", md: "25%" }}
                    InputLeftElement={
                      <Icon as={<MaterialCommunityIcons name="email" />} size={5} ml="2" color="#B1AFFF" />
                    }
                    placeholder="Enter your Email ID"
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
                    placeholder="Enter your Password"
                    p={3}
                    borderRadius={10}
                  />
                </FormControl>
                <Button
                  borderRadius={10}
                  p={3}
                  onPress={handleSubmit}
                  style={{ backgroundColor: "#B1AFFF" }}
                  mt="2"
                  colorScheme="indigo"
                >
                  {isSubmitting ? <ActivityIndicator color="white" /> : <Text style={{ color: "white", fontSize: 16 }}>Sign up</Text>}
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text style={{ fontSize: 14, color: "coolGray.600" }}>
                    Already have an Account.{" "}
                  </Text>
                  <Link
                    onPress={() => navigation.navigate("Login")}
                    _text={{ color: "#B1AFFF", fontWeight: "medium", fontSize: "sm" }}
                  >
                    Login
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </ScrollView>
      </View>
    </>
  );
};

export default Signup;
