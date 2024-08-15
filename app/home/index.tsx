import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import auth, { signOut } from '@react-native-firebase/auth'
import { router } from 'expo-router'
import { storage } from '../_layout'

const index = () => {
  return (
    <SafeAreaView>
      <Text>index</Text>
      <Button onPress={()=>{
        auth().signOut()
        storage.delete('user')
        router.replace('splash')
      }} title='Sign out '/>
       
    </SafeAreaView>
  )
}

export default index