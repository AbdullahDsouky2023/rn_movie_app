import { SafeAreaView, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'

type Props = {}

const index = (props: Props) => {
  const router = useRouter()
  useEffect(()=>{
    router.replace('/auth/signin')
  },[])
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  )
}

export default index