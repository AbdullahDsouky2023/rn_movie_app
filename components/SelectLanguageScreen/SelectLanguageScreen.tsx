import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderComponent from '../auth/signin/HeaderComponent'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons'
type Props = {}
const images = {
    image1: require('../../assets/profile/Flag1.png'),
    image2: require('../../assets/profile/flag2.png'),
    image3: require('../../assets/profile/Flag3.png'),
    image4: require('../../assets/profile/flag4.png'),

    // Add all other images you need
  };
const SelectLanguageScreen = (props: Props) => {
  return (
<SafeAreaView style={tw`flex-1 bg-white`}>
<View style={tw`px-4 border-b pb-4 border-gray-200 border-b-[3px]`}>
        <HeaderComponent
          title='Language'
          back={false}
        />


      </View>  
      <View style={tw`px-4 my-4`}>
       <LanguageComponentItem active={true} flagNumber='image1' language='English'/>
       <LanguageComponentItem active={false} flagNumber='image2' language='Bahasa Indonesia'/>
       <LanguageComponentItem active={false} flagNumber='image4' language='German'/>
       <LanguageComponentItem active={false} flagNumber='image3' language='Chinese'/>
    </View>
    </SafeAreaView>
  )
}

export default SelectLanguageScreen


type Type = {
    active: boolean;
    flagNumber:   keyof typeof images,
    
    language: string;
}

const LanguageComponentItem = ({active,flagNumber,language}:Type)=>{
    return(
        <TouchableOpacity style={tw`flex-row items-center gap-4 bg-gray-200/50 rounded-3xl ${ active ? 'border-violet-500 border-2 ' : '' }  mt-4 py-4 px-4 justify-between`}>

        <View style={tw`flex-row items-center gap-4`}>
        <Image
        source={images[flagNumber]}
        style={tw`w-[30px] h-[30px] rounded-full self-center`}
        />
        <Text style={tw`text-center text-[16px] font-bold `}>
            {language}
            </Text> 
            </View>
            {
                active &&
                <AntDesign name='check' size={28} color='gray' />
            }
        </TouchableOpacity>
    )
}