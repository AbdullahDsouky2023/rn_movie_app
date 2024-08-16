import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'
import { router } from 'expo-router'
import { MMKV } from 'react-native-mmkv'
import { storage } from '../_layout'
import { FirebaseAuthTypes, onAuthStateChanged } from '@react-native-firebase/auth'
import auth from '@react-native-firebase/auth'
export default function Index() {
  const scale = useSharedValue(0)
  const scale2 = useSharedValue(0)
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe =  auth().onAuthStateChanged((currentUser) => {
      console.log('changed')
      if (currentUser) {
        // User is signed in
        const userData:any = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName, // Assuming we stored birthday in displayName
        };
        setUser(userData);
        storage.set('user', JSON.stringify(userData));
      } else {
        // User is signed out
        setUser(null);
        storage.delete('user');
      }
    });

    // Check if user data exists in MMKV on app start
    const storedUser = storage.getString('user');
    if (storedUser) {
      const user = JSON.parse(storedUser)
      console.log('the usefr ',JSON.parse(storedUser).displayName)
      setUser(user);
      
      
    }
    
    checkOnboardingStatus();
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scale.value = withSpring(1, { duration: 1000 })
  }, [])
  const logoAniamtedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      }],
    opacity: scale.value
  }))
  

  const checkOnboardingStatus = () => {
    try {
      const hasSeenOnboarding = storage.getBoolean('hasSeenOnboarding')
      const userData:any = storage.getString('user')
      // console.log('hasSeenOnboarding',hasSeenOnboarding)
      setTimeout(() => {
        if (!hasSeenOnboarding) {
          router.replace('/createProfile');
        } else {
          if(userData){
            if(!userData.profiles){

              router.replace('/createProfile');
            }else {

              router.replace('/home');
            }

          }else {

            router.replace('/auth/signin');
          }
        }
      }, 2000); // Wait for 2 seconds to show the splash screen
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  return (
    <SafeAreaView>
      <Animated.View style={[tw`bg-[#685CF0] h-full flex items-center justify-center gap-4`]}>
        <Animated.Image source={require('../../assets/splash/logo.png')} style={logoAniamtedStyles} />
        <Animated.Image source={require('../../assets/splash/Streamax.png')} style={logoAniamtedStyles} />
      </Animated.View>
    </SafeAreaView>
  )
}