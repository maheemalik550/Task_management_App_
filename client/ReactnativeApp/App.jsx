import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Avatar, NativeBaseProvider } from "native-base"
import Task_Status from './screens/Task_Status';
import Profile from './screens/Profile';

import Search from './screens/Search';
import Setting from './screens/Setting';
import EditProfile from './screens/EditProfile';
import Language from './screens/Language';
import Naviagtion from './config/Naviagtion';
import { NativeScreen } from 'react-native-screens';
import { Provider } from 'react-redux';
import { store } from './store';



const App = () => {
  
  return (
      <>
  <Provider store={store}>
 <NativeBaseProvider>
  <Naviagtion/>
    </NativeBaseProvider>
    </Provider>
      </>
  )
}

export default App