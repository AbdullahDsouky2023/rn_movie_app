import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { Avatar } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import tw from 'twrnc'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Image } from 'react-native'
import { router } from 'expo-router'
type Props = {}

const HomeHeader = (props: Props) => {
  
  return (
    <View style={tw`flex flex-row items-center gap-2 justify-between mt-4`}>
        <View style={tw`flex flex-row items-center gap-2 `}>

      <Avatar source={{uri:auth().currentUser?.photoURL }} containerStyle={{
          borderRadius:55,
          backgroundColor:'red',
          height:44,
          width:44,
          overflow:'hidden'
        }}
        size={35}/>
      <View style={tw`flex gap-1`}>

      <Text style={[tw`text-sm font-bold text-[#191D31]`,{fontSize:RFPercentage(1.5)}]}>
        Hi, {auth().currentUser?.displayName}
      </Text>
      <Text style={[tw`text-[#8C8E98] `,{fontSize:RFPercentage(1.3)}]}>
      Let's watch a movie
      </Text>
      </View>
        </View>
      <View style={tw`flex flex-row gap-4`}>
        <Pressable onPress={()=>router.push('/search')}>
            <Image source={require('../../assets/tabs/search-normal.png')}
            style={[tw`h-[25px] w-[25px] `,{
                objectFit:'contain'
            }]}
            />
        </Pressable>
        <Pressable>
            <Image source={require('../../assets/tabs/notification.png')}
            style={[tw`h-[25px] w-[25px] `,{
                objectFit:'cover'
            }]}/>
        </Pressable>
      </View>
    </View>
  )
}

export default HomeHeader