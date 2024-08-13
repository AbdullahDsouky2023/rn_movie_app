
// app/auth/signin.tsx
import React from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc'
import HeaderComponent from '../../components/auth/signin/HeaderComponent';
import SiginFormComponent from '../../components/auth/signin/SiginFormComponent';
import { Text, View } from 'react-native'
import SignUpFormComponent from '../../components/auth/signin/form/SignUpFormComponent';
export default function SignUp() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white px-8 `}>

      <HeaderComponent title={'Sign Up'} back={false}/>
      <SignUpFormComponent />

     
      
   

    </SafeAreaView>
  );
}