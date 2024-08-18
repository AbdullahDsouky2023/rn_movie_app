import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopSearchMovies from '../../components/home/TopSearch'
import TopSearchScreenComponent from '../../components/topSearch/TopSearchScreenComponent'

type Props = {}

const index = (props: Props) => {
  return (
    <TopSearchScreenComponent/>
  )
}

export default index