import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Index() {
  const scale = useSharedValue(0)
  const scale2 = useSharedValue(0)
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
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      setTimeout(() => {
        if (hasSeenOnboarding === 'true') {
          router.replace('/auth/signin');
        } else {
          router.replace('/onboarding');
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