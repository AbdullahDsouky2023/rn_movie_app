
// app/auth/signin.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc'
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from '@expo/vector-icons/AntDesign';


type Props = {
    title:string
}

const HeaderComponent:React.FC<Props> = ({title}) => {
  const router = useRouter()
  return (
     <View style={tw`flex flex-row justify-between pt-10 items-center`}>
    <AntDesign onPress={()=>router.back()} name="arrowleft" size={RFPercentage(3.3)} color="black" />
    <Text style={{fontSize:RFPercentage(3),fontWeight:'500',textAlign:'center'}}>{title}</Text>
    <View/>
    </View>
  )
}

export default HeaderComponent