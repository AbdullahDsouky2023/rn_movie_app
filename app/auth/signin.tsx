
// app/auth/signin.tsx
import React, { useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc'
import HeaderComponent from '../../components/auth/signin/HeaderComponent';
import SiginFormComponent from '../../components/auth/signin/SiginFormComponent';
import { Text, View } from 'react-native'
import auth, { signInWithPhoneNumber} from '@react-native-firebase/auth'
export default function SignIn() {
  const router = useRouter();
  useEffect(()=>{

    auth().settings.appVerificationDisabledForTesting = true
   auth().verifyPhoneNumber('+201144254129', )
     .on('state_changed', (phoneAuthSnapshot) => {
     console.log('Snapshot state: ', phoneAuthSnapshot.state);
      });
  })
  return (
    <SafeAreaView style={tw`flex-1 bg-white px-8 `}>

      <HeaderComponent title={'Sign In'} />
      <SiginFormComponent />
      <View style={tw`flex flex-row gap-4 mt-4  justify-center items-center`}>

      <Link href={'/auth/forgetPassword'}  style={tw`text-xl text-violet-900 font-bold`} >
        Forget Password?</Link>
      </View>
      <View style={tw`flex flex-row gap-4 mt-4  justify-center items-center`}>

      <Text style={tw`text-xl`}>
        Don’t have account

      </Text>
      <Link href={'/auth/signup'}  style={tw`text-xl text-violet-900 font-bold`} >
        Sign Up</Link>
      </View>

    </SafeAreaView>
  );
}