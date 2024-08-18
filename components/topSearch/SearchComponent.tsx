import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

type Props = {
    searchQuery:string,
    setSearchQuery:React.Dispatch<React.SetStateAction<string>>
}

const SearchComponent = ({searchQuery,setSearchQuery}: Props) => {
  return (
    <View style={tw`mt-6 px-4 relative`}>
    <View style={tw`border border-gray-300 flex flex-row gap-2 items-center justify-between p-2 px-4 rounded-lg mb-4 rounded-full `}>
        <View style={tw`flex-row gap-2`}>

            <Image source={require('../../assets/tabs/search.png')} style={tw`mt-2 h-[30px] w-[20px]`} />
            <TextInput
                style={{ fontSize: RFPercentage(2) }}
                placeholder="Search"

                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
        <Image source={require('../../assets/tabs/setting-5.png')} style={tw`mt-2 h-[24px] w-[24px]`} />
    </View>
</View>
  )
}

export default SearchComponent