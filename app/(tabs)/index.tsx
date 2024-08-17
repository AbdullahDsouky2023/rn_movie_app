import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import auth, { signOut } from '@react-native-firebase/auth'
import { router } from 'expo-router'
import { storage } from '../_layout'
import Button from '../../components/Button'
import HomeComponent from '../../components/home/HomeComponent'

const home = () => {

  return (
      <HomeComponent/>
  )
}

export default home