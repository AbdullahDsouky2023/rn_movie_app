import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient';
type Props = {}
const {width,height } = Dimensions.get('screen')
const FamilySharingComponent = (props: Props) => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <Image source={require('../../assets/profile/familySharing.png')}
      style={tw`h-[${height*0.6}px] w-full`}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={tw`bg-red-400`}
      />
      <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default FamilySharingComponent