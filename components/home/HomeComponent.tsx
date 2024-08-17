import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from './HomeHeader'
import SliderComponent from './SliderComponent'
type Props = {}

const HomeComponent = (props: Props) => {
  return (
    <SafeAreaView style={tw`bg-white h-full px-5`}>
      <HomeHeader/>
      <SliderComponent/>
      <StatusBar style='dark'/>
    </SafeAreaView>
  )
}

export default HomeComponent