import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, Image, FlatList, Dimensions } from 'react-native';
import tw from 'twrnc';
import { useEffect, useState } from 'react';
import Slide from '../../components/onboarding/Slide';

const { width, height } = Dimensions.get('window');

interface OnboardingPage {
  headerText: string;
  image: any; // Consider using a more specific type if possible
  contentText: string;
}

const onboardingPages: OnboardingPage[] = [
  {
    headerText: 'Watching can be from anywhere',
    image: require('../../assets/onboarding/onboarding1.png'),
    contentText: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt'
  },
  {
    headerText: 'Complete list of movies',
    image: require('../../assets/onboarding/onboarding2.png'), // Assuming you have this image
    contentText: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt'
  },
  {
    headerText: 'Complete list of movie2s',
    image: require('../../assets/onboarding/onboarding2.png'), // Assuming you have this image
    contentText: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt'
  }
];

const Index: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <FlatList
        data={[onboardingPages[activeIndex]]}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={tw`w-[${width}px]`}>
            <Slide 
              item={activeIndex}
              contentText={item.contentText}
              headerText={item.headerText}
              image={item.image}
              isLastSlide={activeIndex === onboardingPages.length - 1}

              setActiveIndex={setActiveIndex}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default Index;