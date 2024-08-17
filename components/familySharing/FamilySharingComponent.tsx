import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../Button'
import { router } from 'expo-router'

type Props = {}
const {width, height} = Dimensions.get('screen')

const FamilySharingComponent = (props: Props) => {
  return (
    <View style={tw`bg-white h-full  relative`}>
      <View style={tw`relative`}>
        <Image 
          source={require('../../assets/profile/familySharing.png')}
          style={tw`h-[${height*0.6}px] w-full`}
        />
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
          locations={[0, 1]}
          style={tw`absolute top-0 left-0 right-0 bottom-0`}
        />
      </View>
      <View style={tw`flex gap-4 mt-[-${height*0.06}px]`}>
        <Text style={tw`text-3xl font-bold text-center text-slate-700`}>
        Are you ready to watch movies?
        </Text>
        <Text style={tw`text-xl  text-center px-8 text-slate-400`}>
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod         </Text>
      <Button title='Continue' onPress={()=>router.replace('faveCategories')}/>
      <Button title='Skip for Now' style={tw`bg-white`} textStyle={tw`text-violet-500`}/>
      </View>
      {/* <StatusBar style='light'/> */}
    </View>
  )
}

export default FamilySharingComponent