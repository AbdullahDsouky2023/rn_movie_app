import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV()

const _layout = () => {
  const router = useRouter()
 
  return (
    <Stack
    screenOptions={{
        headerShown:false,
        
    }}
    >

        <Stack.Screen name='onboarding/index'/>
        <Stack.Screen name='splash/index'/>
        <Stack.Screen name='auth/index'/>
        <Stack.Screen name='createProfile/index'/>
    </Stack>
  )
}

export default _layout