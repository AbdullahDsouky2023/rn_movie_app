import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import Button from '../Button'
import { router } from 'expo-router'
type Props = {}

const PaymentSuccessScreen = (props: Props) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white mt-4`}>

<Image source={require('../../assets/tabs/paymentSuccess.png')} style={tw`w-[325px] self-center h-[250px]`} />
<Text style={tw`text-center text-[30px] font-bold mt-10`}>
Payment Success!
</Text>
<Text style={tw`text-center text-[17px]  mt-10`}>
Congratulation! Your payment has been confirmed</Text>
<View style={tw`flex-row px-4 mt-10 gap-4 items-center`}>

<Image source={require('../../assets/tabs/pay2.png')} style={tw`w-[70px] h-[70px]`} />
<View style={tw`flex-col gap-4`}>
  <Text style={tw`text-center text-[17px] font-bold `}>
  Movees 1 Year Subscription
  </Text>
  <Text style={tw` text-[17px]  `}>
  You save over 15%  </Text>
     
</View>
</View>
<View style={tw`px-4 mt-10`}>
  <View style={tw`flex flex-row gap-4 w-full justify-between`}>
    <Text style={tw`text-black text-[16px]`}>
    Subscription fee
      </Text>
    <Text style={tw`text-black font-bold text-[20px]`}>
        $119.98     
 </Text>
  </View>
  <View style={tw`flex flex-row gap-4 w-full justify-between mt-8`}>
    <Text style={tw`text-black text-[17px]`}>
    Tax fee      </Text>
    <Text style={tw`text-black font-bold text-[20px]`}>
        $2.4    
 </Text>

  </View>
 <Image source={require('../../assets/tabs/line.png')} style={tw`w-full h-[5px] mt-10`} />
 <View style={tw`flex flex-row gap-4 w-full justify-between mt-4`}>
    <Text style={tw`text-black text-[17px]`}>
   Total     </Text>
    <Text style={tw`text-violet-800 font-bold text-[20px]`}>
        $123.4    
 </Text>

  </View>
  <Button
  title='Watch Movie Now!'
  style={tw`mt-10`}
    onPress={()=>router.navigate('splash')}
/>
 </View>

    </SafeAreaView>
  )
}

export default PaymentSuccessScreen