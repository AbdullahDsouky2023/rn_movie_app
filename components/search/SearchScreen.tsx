import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import HeaderComponent from '../auth/signin/HeaderComponent'
import SearchComponent from '../topSearch/SearchComponent'
import { Slider } from 'react-native-elements'
import { SliderComponent } from 'react-native'
type Props = {}

const SearchScreen = (props: Props) => {
    const [searchQuery, setSearchQuery] = React.useState('')
  return (
    <SafeAreaView style={tw`flex-1 bg-white px-4`}>
      <HeaderComponent title='Explore' back={false} />
      <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  
    
    </SafeAreaView>
  )
}

export default SearchScreen