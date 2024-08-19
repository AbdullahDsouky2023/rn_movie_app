import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, Image, Pressable, ImageSourcePropType } from 'react-native';
import tw from 'twrnc';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useRouter} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { storage } from '../../app/_layout';
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
      storage.set('hasSeenOnboarding', 'true')
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
    <SafeAreaView style={tw``}>
      <View style={tw``}>
        <Animated.View style={[tw`my-8`, animatedViewStyles]}>
          {
            isLastSlide ?
            <View style={tw`bg-white absolute px-8`}> 
            <BlurView intensity={10} style={tw`absolute bottom-10 left-0 right-0 h-1/2 z-10 `} />
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.98)']}
            style={tw`absolute bottom-0 left-0 right-0 h-[60%] z-10 opacity-90 bg-white`}
/>
                          <Animated.Image source={image} style={[tw`  h-[750px] w-[350px] rounded self-center`, animatedViewStyles]} />
            </View>
            : <Animated.Image source={image} style={[tw`h-[372px] w-[20rem] rounded self-center`, animatedViewStyles]} />
          }
        </Animated.View>
          
        <View style={tw`${isLastSlide ? 'bottom-[-350px]' : ''} `}>

          
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
      </View>
    </SafeAreaView>
  );
};

export default Slide;