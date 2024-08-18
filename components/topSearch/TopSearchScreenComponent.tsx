import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import TopSearchMovies from '../home/TopSearch'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import HeaderComponent from '../auth/signin/HeaderComponent'
import { AntDesign } from '@expo/vector-icons'
import { Image } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { ScrollView } from 'react-native-virtualized-view'
import SearchComponent from './SearchComponent'
type Props = {}

const TopSearchScreenComponent = (props: Props) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <SafeAreaView style={tw`px-4 bg-white`}>
            <HeaderComponent title='Top Searches' back={false} />
       <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ScrollView style={tw`mb-32`} showsVerticalScrollIndicator={false}>


            <TopSearchMovies outSide={false} searchQuery={searchQuery} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default TopSearchScreenComponent