import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import HeaderComponent from '../auth/signin/HeaderComponent'
import SearchComponent from '../topSearch/SearchComponent'
import search from '../../app/(tabs)/search'
import { ScrollView } from 'react-native-virtualized-view'
type Props = {}

const DownloadScreen = (props: Props) => {
    const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <SafeAreaView style={tw`flex-1 bg-white px-4`}>
     <HeaderComponent
     title='Downloads'
     back={false}
     />
     <SearchComponent 
     searchQuery={searchQuery}
     setSearchQuery={setSearchQuery}
     />
     <ScrollView  style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1   h-[600px]  items-center justify-center`}>
        <Image 
        source={require('../../assets/tabs/receive-square.png')}
        style={tw`w-25 h-25`}
        />
        <Text style={tw`text-xl font-bold mt-4`}>
        You have no download  
              </Text>
        <Text style={tw`text-slate-500 mt-4 `}>
        Movie and series you download will appear here.   
                   </Text>
                   </View>
        </ScrollView>
    </SafeAreaView >
  )
}

export default DownloadScreen