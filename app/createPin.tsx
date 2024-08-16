import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import HeaderComponent from '../components/auth/signin/HeaderComponent'
import Button from '../components/Button'
import OTPTextView from 'react-native-otp-textinput';
import OtpInput from '../components/profile/OtpInput'
import { router } from 'expo-router'
type Props = {}


const createPin = (props: Props) => {

  return (
    <SafeAreaView style={tw`bg-white h-full px-4`}>
      <HeaderComponent title='Create Pin' back={false}/>
      <KeyboardAvoidingView behavior='padding'>
<OtpInput onComplete={(e)=>console.log('hello',e)}/>
          </KeyboardAvoidingView>
      <Button title='Create Pin' onPress={()=>router.push('familySharing')}/>
    </SafeAreaView>
  )
}

export default createPin
const styles = StyleSheet.create({
  
});