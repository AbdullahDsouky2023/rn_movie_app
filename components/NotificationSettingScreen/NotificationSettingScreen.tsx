import { View, Text } from 'react-native'
import React from 'react'
import HeaderComponent from '../auth/signin/HeaderComponent'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Switch } from 'react-native-elements'
type Props = {}

const NotificationSettingScreen = (props: Props) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
    <View style={tw`px-4 border-b pb-4 border-gray-200 border-b-[3px]`}>
            <HeaderComponent
              title='Notifications'
              back={false}
            />
            
          </View>  
          <View style={tw`px-4 m-4  rounded-xl border-2 border-gray-200 mt-5`}>
            <View style={tw`flex-row items-center justify-between py-4 border-b-2 border-gray-200`}>
              <Text style={tw`text-[17px] font-bold`}>
                Assign
                </Text>
                <Switch
                  value={false}
                />
                </View>
            <View style={tw`flex-row items-center justify-between py-4 border-b-2 border-gray-200`}>
              <Text style={tw`text-[17px] font-bold`}>
                Follow
                </Text>
                <Switch
                  value={false}
                />
                </View>
            <View style={tw`flex-row items-center justify-between py-4 border-b-2 border-gray-200`}>
              <Text style={tw`text-[17px] font-bold`}>
                Comment
                </Text>
                <Switch
                  value={true}
                />
                </View>
            <View style={tw`flex-row items-center justify-between py-4 `}>
              <Text style={tw`text-[17px] font-bold`}>
                Notification
                </Text>
                <Switch
                  value={true}
                />
                </View>
            </View>
          </SafeAreaView>
  )
}

export default NotificationSettingScreen