import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack
    screenOptions={{
        headerShown:false,
        
    }}
    >

        <Stack.Screen name='onboarding/index'/>
        <Stack.Screen name='splash/index'/>
        <Stack.Screen name='auth/index'/>
    </Stack>
  )
}

export default _layout