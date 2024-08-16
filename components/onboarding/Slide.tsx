import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, Image, Pressable, ImageSourcePropType } from 'react-native';
import tw from 'twrnc';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useRouter} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../../app/splash';
interface SlideProps {
  headerText: string;
  contentText: string;
  setActiveIndex: (value: number) => void;
  image: ImageSourcePropType;
  item: number;
  isLastSlide:boolean
}

const Slide: React.FC<SlideProps> = ({ setActiveIndex, item, headerText, contentText, image,isLastSlide }) => {
  const scale = useSharedValue(0.7);
  const opacity = useSharedValue(0);
  const router = useRouter()

  useEffect(() => {
    scale.value = withSpring(1);
    opacity.value = withSpring(1);
  }, []);

  const animatedViewStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }));
  const handleFinishOnboarding = async () => {
    try {
      storage.set('hasSeenOnboarding', true)
      router.replace('/auth/signin');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      router.replace('/splash');
    }
  };
  const handleContinue = () => {
    if (isLastSlide) {
      handleFinishOnboarding()
    } else {
      console.log('Pressing', item);
      setActiveIndex(item + 1);
    }
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`bg-white h-full`}>
        <Animated.View style={[tw`my-8`, animatedViewStyles]}>
          <Animated.Image source={image} style={[tw`h-[372px] w-[20rem] rounded self-center`, animatedViewStyles]} />
        </Animated.View>
        <Animated.View style={animatedViewStyles}>
          <Animated.Text style={[tw`text-2xl font-semibold text-center text-slate-700`, animatedViewStyles]}>
            {headerText}
          </Animated.Text>
        </Animated.View>
        <Animated.View style={animatedViewStyles}>
          <Text style={tw`text-xl p-8 text-center text-slate-600`}>
            {contentText}
          </Text>
        </Animated.View>
        <Pressable 
          onPress={handleContinue} 
          style={tw`bg-[#685CF0] px-12 py-4 min-w-[300px] rounded-full text-white self-center`}
        >
          <Text style={tw`text-white text-center text-2xl`}>
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Slide;