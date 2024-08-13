import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
type Props = {}

const createPassword = (props: Props) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Text>createPassword</Text>
    </SafeAreaView>
  )
}

export default createPassword