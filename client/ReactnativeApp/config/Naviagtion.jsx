import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash_screen from '../screens/Splash_screen';
import Slider_screen1 from '../screens/Slider_screen1';
import Slider_Screen2 from '../screens/Slider_Screen2';
import Slider_screen3 from '../screens/Slider_screen3';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import TabNavigation from '../screens/TabNavigation';
import Profile from '../screens/Profile';
import CalendarScreen from '../screens/Calender_Screen';
import AddTask from '../screens/AddTask';
import Create_Team from '../screens/Create_Team';
import Project from '../screens/Project';
import Chat from '../screens/Chat';
import Task_Status from '../screens/Task_Status';
import EditProfile from '../screens/EditProfile';
import SideMenu from '../screens/SideMenu';
import Setting from '../screens/Setting';
import Language from '../screens/Language';
import { TodayTask_Screen } from '../screens/TodayTask_Screen';
import { save_tokens_constant } from '../utils/constants';
import { check_auth_service } from '../services/auth_service';
import { authAction } from '../store/slice/user_slice';
import { Loader } from '../Components/Loader';
import Alluser from '../screens/AllUser';
import Search from '../screens/Search';
import AddProject from '../screens/AddProject';
import Home from '../screens/Home';
import { View } from 'native-base';
import { Text } from 'react-native-svg';
import { lightGreen100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Stack = createStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const { loading, auth, profile } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth_token = await AsyncStorage.getItem(save_tokens_constant);
        console.log('Auth Token:', auth_token);

        if (auth_token) {
          const res = await check_auth_service(auth_token);
          console.log('API Response:', res);

          if (res.data) {
            console.log('User Data:', res.data.data);
            dispatch(authAction({ auth: true, profile: res.data.data }));
          } else {
            console.log('No data received');
            dispatch(authAction({ auth: false, profile: null }));
          }
        } else {
          dispatch(authAction({ auth: false, profile: null }));
        }
      } catch (error) {
        console.error('Error in authentication check:', error);
        dispatch(authAction({ auth: false, profile: null }));
      }
    };

    fetchUserData();
  }, [dispatch]);

  console.log('Loading:', loading);
  console.log('Auth:', auth);
  console.log('Profile:', profile);

  if (loading || auth === null) {
    return <Loader size='large' />;
  }

  return (
      <NavigationContainer>
      {auth ? (
           <Stack.Navigator screenOptions={{ headerShown: false }}>
        
       <Stack.Screen name='TabNavigation' component={TabNavigation} />
             <Stack.Screen name='Profile' component={Profile} />
             <Stack.Screen name='CalendarScreen' component={CalendarScreen} />
             <Stack.Screen name='AddTask' component={AddTask} />
             <Stack.Screen name='Project' component={Project} />
             <Stack.Screen name='Create_Team' component={Create_Team} />
             <Stack.Screen name='Chat' component={Chat} />
             <Stack.Screen name='Search' component={Search} />
             <Stack.Screen name='Task_Status' component={Task_Status} />
             <Stack.Screen name='TodayTask_Screen' component={TodayTask_Screen} />
             <Stack.Screen name='EditProfile' component={EditProfile} />
             <Stack.Screen name='SideMenu' component={SideMenu} />
             <Stack.Screen name='Alluser' component={Alluser} />
             <Stack.Screen name='Setting' component={Setting} />
             <Stack.Screen name='Language' component={Language} />
             <Stack.Screen name='AddProject' component={AddProject} />
       </Stack.Navigator>
     ) : (
       <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name='Splash_screen' component={Splash_screen} />
         <Stack.Screen name='Slider_screen1' component={Slider_screen1} />
         <Stack.Screen name='Slider_Screen2' component={Slider_Screen2} />
         <Stack.Screen name='Slider_screen3' component={Slider_screen3} />
         <Stack.Screen name='Signup' component={Signup} />
         <Stack.Screen name='Login' component={Login} />
       </Stack.Navigator>
     )}
   </NavigationContainer> 
  );
};


export default Navigation



      {/* <NavigationContainer>
      {auth ? (
           <Stack.Navigator screenOptions={{ headerShown: false }}>
        
       <Stack.Screen name='TabNavigation' component={TabNavigation} />
             <Stack.Screen name='Profile' component={Profile} />
             <Stack.Screen name='CalendarScreen' component={CalendarScreen} />
             <Stack.Screen name='AddTask' component={AddTask} />
             <Stack.Screen name='Project' component={Project} />
             <Stack.Screen name='Create_Team' component={Create_Team} />
             <Stack.Screen name='Chat' component={Chat} />
             <Stack.Screen name='Search' component={Search} />
             <Stack.Screen name='Task_Status' component={Task_Status} />
             <Stack.Screen name='TodayTask_Screen' component={TodayTask_Screen} />
             <Stack.Screen name='EditProfile' component={EditProfile} />
             <Stack.Screen name='SideMenu' component={SideMenu} />
             <Stack.Screen name='Alluser' component={Alluser} />
             <Stack.Screen name='Setting' component={Setting} />
             <Stack.Screen name='Language' component={Language} />
             <Stack.Screen name='AddProject' component={AddProject} />
       </Stack.Navigator>
     ) : (
       <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name='Splash_screen' component={Splash_screen} />
         <Stack.Screen name='Slider_screen1' component={Slider_screen1} />
         <Stack.Screen name='Slider_Screen2' component={Slider_Screen2} />
         <Stack.Screen name='Slider_screen3' component={Slider_screen3} />
         <Stack.Screen name='Signup' component={Signup} />
         <Stack.Screen name='Login' component={Login} />
       </Stack.Navigator>
     )}
   </NavigationContainer> */}




