import { View, Text } from 'react-native'
import React from 'react'
import HeaderComponent from '../auth/signin/HeaderComponent'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import InputComponent from '../auth/signin/form/InputComponent'
import { ScrollView } from 'react-native-virtualized-view'
import Button from '../Button'
import { router } from 'expo-router'
type Props = {}

const AddCardComponentScreen = (props: Props) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white px-4`}>
     <HeaderComponent
        title='Add Card'
        back={false}
     />
     <ScrollView style={tw`flex-1 mt-4 `}>

     <InputComponent
      label={'Name'} textContentType={'name'} value={''}
      onChangeText={()=>console.log('hhh')}      
        />
     <InputComponent
      label={'Card Number'} textContentType={'telephoneNumber'} value={''}
      onChangeText={()=>console.log('hhh')}      
        />
     <InputComponent
      label={'Expiration Date'} textContentType={'name'}
      isDate={true} 
      value={''}
      onChangeText={()=>console.log('hhh')}      
        />
        <InputComponent
      label={'Cvv'} textContentType={'telephoneNumber'} value={''}
      onChangeText={()=>console.log('hhh')}      
        />
        <Button
        title='Pay $11.98/month'
        style={tw`mt-15`}
        onPress={()=>router.push('/paymentSuccess')}
        />
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddCardComponentScreen