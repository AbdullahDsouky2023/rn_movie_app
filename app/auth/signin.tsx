
// app/auth/signin.tsx
import React from 'react';
import {  useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc'
import HeaderComponent from '../../components/auth/signin/HeaderComponent';
import SiginFormComponent from '../../components/auth/signin/SiginFormComponent';
import MetaDataComponent from '../../components/auth/signin/MetaDataComponent';
import { ScrollView } from 'react-native';
export default function SignIn() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white px-8 `}>
      <ScrollView showsVerticalScrollIndicator={false}>

      <HeaderComponent title={'Sign In'} />
      <SiginFormComponent />
     <MetaDataComponent/>
      </ScrollView>

    </SafeAreaView>
  );
}