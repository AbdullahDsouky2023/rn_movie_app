import { View, Text, Image, Dimensions, Switch } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons'
import InputComponent from '../../components/auth/signin/form/InputComponent'
import Button from '../../components/Button'
import ImageComponent from '../../components/profile/ImageComponent'
import { router } from 'expo-router'
type Props = {}
const { width , height } = Dimensions.get('screen')
const index = (props: Props) => {
    const [profileName,setProfileName] = useState<string>('')
    const [groupWatchChecked,setGroupWatchChecked] = useState<boolean>(false)
    const [kidWatchedChecked,setkidWatchedChecked] = useState<boolean>(false)
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

    const handleImageUrlChange = (url: string) => {
      setProfileImageUrl(url);
    };
  return (
    <SafeAreaView style={tw`bg-white flex-1 px-4  w-full`}>
      <Text style={[tw`text-3xl text-center py-8 pb-8`]}>Create Profile</Text>

      <ImageComponent onImageUrlChange={handleImageUrlChange}/>
    <InputComponent
    label='Profile Name'
    value={profileName}
    textContentType='name'
    onChangeText={(text)=>setProfileName(text)}

    />
    <View style={tw`flex flex-row gap-8 my-4 items-center`}>
        <View style={tw`flex  gap-4`}>

        <Text style={tw`text-xl font-bold`}>
        Group Watch
        </Text>
        <Text  style={tw`text-sm text-slate-400 font-bold max-w-[${width*0.7}px]`}>
        Watch with family and personal friends who are in different places
        </Text>
        </View>
      <Switch style={tw`bg-white `}   value={groupWatchChecked} onChange={()=>setGroupWatchChecked(!groupWatchChecked)} />
    </View>
    <View style={tw`flex flex-row gap-8 my-4 items-center`}>
        <View style={tw`flex  gap-4`}>

        <Text style={tw`text-xl font-bold`}>
        Kids Profile        </Text>
        <Text  style={tw`text-sm text-slate-400 font-bold max-w-[${width*0.7}px]`}>
        A profile with currated content and features with a simplified user interface        </Text>
        </View>
      <Switch style={tw`bg-white `}   value={kidWatchedChecked} onChange={()=>setkidWatchedChecked(!groupWatchChecked)} />
    </View>
    <Button title='Create Pin'  style={tw`mt-4`} onPress={()=>router.push('createPin')}/>
    <Button title='Without Pin' textStyle={tw`text-violet-400 font-bold text-lg`}  style={tw`mt-4 bg-white`}  onPress={()=>console.log('')}/>
      <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default index