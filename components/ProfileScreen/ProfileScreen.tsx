import { View, Text, SafeAreaView, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import HeaderComponent from '../auth/signin/HeaderComponent'
import { AntDesign } from '@expo/vector-icons'
import { ScrollView } from 'react-native-virtualized-view'
import { router } from 'expo-router'
import { Overlay } from 'react-native-elements'
import Button from '../Button'
import { storage } from '../../app/_layout'
import auth from '@react-native-firebase/auth'

// Import all your images here
const images = {
  image1: require('../../assets/profile/user.png'),
  image2: require('../../assets/profile/lock.png'),
  image3: require('../../assets/profile/notification.png'),
  image4: require('../../assets/profile/security-safe.png'),
  image5: require('../../assets/profile/global.png'),
  image6: require('../../assets/profile/security.png'),
  image7: require('../../assets/profile/message-question.png'),
  image8: require('../../assets/profile/logout.png'),
  // Add all other images you need
};

type Props = {}

type General = {
  title: string,
  imageName: keyof typeof images,
  // Add other properties as needed
  logout?: boolean;
  setIsVisible?: (isVisible: boolean) => void;
route?: string;
}

const GeneralComponent = ({
  title,
  logout,
  imageName,
  route,
  setIsVisible
}: General) => {
  return (
    <TouchableOpacity 
    onPress={()=>{
      if(logout) {
        // router.push('/auth/signin')
        setIsVisible(true)
      }else {

        router.push(route)
      }
    }}
    style={tw`flex-row items-center justify-between py-4 px-4`}>
      <View style={tw`flex-row items-center justify-between py-4 gap-4`}>
        {imageName && (
          <Image source={images[imageName]} style={tw`w-[25px] h-[25px] `} />
        )}
        
        <Text style={tw`text-[16px] font-bold ${logout ? 'text-red-500' : 'text-black'}`}>
          {title}
        </Text>
      </View>
      {
        !logout &&
      <AntDesign name='right' size={28} color='gray' />
      }
    </TouchableOpacity>
  )
}

const ProfileScreen = (props: Props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
          <View style={tw`px-4 border-b pb-4 border-gray-200 border-b-[3px]`}>
        <HeaderComponent
          title='Settings'
          back={false}
        />
      </View>
        <ScrollView
        
        >

    
      <View style={tw`flex-1 px-4`}>
        <Text style={tw`mt-4 text-[24px] font-bold`}>
          General
        </Text>
        <GeneralComponent title="Edit Profile" imageName="image1" route='/editProfile' />
        <GeneralComponent title="Change Password" imageName="image2" route='/auth/createPassword' />
        <GeneralComponent title="Notifications" imageName="image3" route='/notificationSettings'  />
        <GeneralComponent title="Security" imageName="image4" route='/selectLanguage' />
        <GeneralComponent title="Language" imageName="image5" route='/selectLanguage' />
        {/* Add more GeneralComponent instances as needed */}
      </View>
      <View style={tw`px-4 mt-8`}>
        <Text style={tw`mt-4 text-[24px] font-bold`}>
        Preferencess          </Text>
        <GeneralComponent title="Legal and Polices" imageName="image6" route='/editProfile' />
        <GeneralComponent title="Help and Support" imageName="image7"  route='/selectLanguage'/>
        <GeneralComponent title="Logout" setIsVisible={setIsVisible} imageName="image8"  logout={true}/>    
       
<CustomAlert visible={isVisible} 
  setIsVisible={setIsVisible}
/>
        {/* Add more GeneralComponent instances as needed */}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const CustomAlert = ({visible,setIsVisible}) => {
  return (
    <View>
      <Overlay 
        isVisible={visible}
        onBackdropPress={() => setIsVisible(false)}
        // ModalComponent={Modal}
      >
        <Modal setIsVisible={setIsVisible}/>
        </Overlay>
    </View>
  )
}
const Modal = ({setIsVisible})=>{
  return(
    <View style={tw`bg-white p-4 rounded-xl  `}>
          <Text style={tw`text-slate-700 px-4 text-center  text-[21px] font-bold`}>
          Are you sure you want to logout?
          </Text>
          <Button
          onPress={()=>{
            storage.delete('user')
            router.push('splash')
            auth().signOut()
            setIsVisible(false)
          }}
          style={tw`mt-4 min-w-[240px] bg-white`}
          title='Logout'
          textStyle={tw`text-red-400 font-bold `}
          />
          <Button
          style={tw`mt-4 min-w-[240px]`}
          title='Cancel'
          onPress={()=>{
            setIsVisible(false)
          }}
          />
        </View>
  )
}