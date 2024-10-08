import { View, Text, Pressable, Dimensions, ActivityIndicator, ViewStyle } from 'react-native'
import React from 'react'
import  tw from 'twrnc'
import { RFPercentage } from 'react-native-responsive-fontsize'
const { width , height } = Dimensions.get('screen')

type Props = {
  onPress:()=>void,
  title?:string,
  loading?:boolean,
  style?:  ViewStyle,
  textStyle?:ViewStyle,
  disabled?:boolean,
  Icon?:React.ReactNode
}

const Button:React.FC<Props> = ({
  onPress,
  title,
  loading,
  style,
  textStyle,
disabled,
Icon
}) => {
  return (
    <Pressable
    onPress={onPress} 
    style={[tw`bg-[#685CF0] px-12 py-4 min-w-[${width*0.85}px] rounded-full text-white self-center`,style]}
    disabled={loading ||disabled}
  >
    <View style={tw`text-white text-center text-2xl flex items-center`}>
      {loading? 
      <ActivityIndicator color={'white'} size={RFPercentage(3)} />
        :
        <View style={tw`flex flex-row items-center justify-center gap-2`}>
       { Icon}
      <Text style={[tw`text-white text-center text-2xl flex items-center`,textStyle]}>
        {title}
      </Text>
        </View>
      }
    </View>
  </Pressable>
  )
}

export default Button