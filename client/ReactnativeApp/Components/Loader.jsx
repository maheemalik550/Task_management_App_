import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export const Loader = ({size='small', color='#B1AFFF'}) => {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator color={color} size={size} />
    </View>
  )
}