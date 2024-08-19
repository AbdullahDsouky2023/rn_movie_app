import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import HeaderComponent from '../auth/signin/HeaderComponent'
import { Avatar } from '@rneui/base'
import auth from '@react-native-firebase/auth'
import InputComponent from '../auth/signin/form/InputComponent'
type Props = {}

const EditProfileScreen = (props: Props) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
<View style={tw`px-4 border-b pb-4 border-gray-200 border-b-[3px]`}>
        <HeaderComponent
          title='Edit Profile'
          back={false}
        />
        
      </View>  

      <Avatar source={{uri:auth().currentUser?.photoURL }} containerStyle={{
          borderRadius:55,
          backgroundColor:'red',
          height:88,
          width:88,
          overflow:'hidden',
          alignSelf:'center',
          marginVertical:20
        }}
        size={35}/>
        <View style={tw`px-4`}>
        <InputComponent
        placeholder='userName'
        label='Username'
        value={auth().currentUser?.displayName}
        />
        <InputComponent
        label='Email'
        value={auth().currentUser?.email}
        />
        </View>
            <Text style={tw`text-start mt-5 text-[20px] px-4 font-bold text-slate-500`}>
            Account Liked With
                </Text>
        <View style={tw`px-4 bg-gray-200/69 p-4 mt-5 flex flex-row  gap-4 self-center rounded-full items-center justify-center w-[290px]`}>
            <Image source={require('../../assets/auth/google.png')} style={tw`w-[25px] h-[25px]`} />
          <Text style={tw`text-[16px] font-bold`}>
          Google
            </Text>
            </View>
        </SafeAreaView>
  )
}

export default EditProfileScreen