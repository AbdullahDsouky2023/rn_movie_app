import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { RFPercentage } from 'react-native-responsive-fontsize'
import Button from '../Button'
import HeaderComponent from '../auth/signin/HeaderComponent'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { ScrollView } from 'react-native-virtualized-view'
import tw from 'twrnc'
type Props = {}

const SubScriptionScreen = (props: Props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <AntDesign onPress={()=>router.back()} style={{top:60,left:50,position:'absolute'}} name="arrowleft" size={RFPercentage(3.3)} color="white" />
    <Image
      source={require('../../assets/tabs/subscription.png')}
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,   
        bottom: 0,
            zIndex: -1,
            }}

     />
    
     <LinearGradient
     colors={['transparent', 'rgba(0,0,0,0.8)']}
     style={{
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         zIndex: -1,
        }}
     />
     <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 100,gap:20}}>
      
        <Text style={{fontSize: RFPercentage(4),backgroundColor:'', fontWeight: 'bold', color: 'white'}}>
        Streamax 
        </Text>
      
        <Text style={{fontSize: RFPercentage(3),backgroundColor:'', fontWeight: 'bold', color: 'white'}}>
        Start streaming today!    
            </Text>
        <Text style={{fontSize: RFPercentage(2),backgroundColor:'', fontWeight: 'semibold',textAlign:'center', color: 'white'}}>
        Cancel anytime, affective at the end of the payment period          
          </Text>
          <Button title='$11.98/month' onPress={()=>router.push('/addCard')}/>
          <Button title='$110.98/year' onPress={()=>router.push('/addCard')}/>
          <Text style={tw`text-white text-lg`}>
          12 months at $10.00/month. Save over 15%
          </Text>
     </View>
     
    </View>
  )
}

export default SubScriptionScreen