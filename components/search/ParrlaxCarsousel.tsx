import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import tw from 'twrnc';
import { Movie } from '../../utils/home/helpers';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ITEM_WIDTH = SCREEN_WIDTH * 0.85;
const ITEM_HEIGHT = ITEM_WIDTH * 0.52;
const SPACING = 10;
const FULL_ITEM_WIDTH = ITEM_WIDTH + SPACING * 2;


type props = {
    data:Movie[]
}
const ParallaxCarousel = ({data}:props) => {
  const scrollX = useSharedValue(0);
  const scrollRef = useRef(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  type renderItemProps = {
    item: Movie;
    index: number;
  };
  const renderItem = ({ item, index }:renderItemProps) => {
    const animatedStyle = useAnimatedStyle(() => {
      const input = scrollX.value / FULL_ITEM_WIDTH;
      const translateX = interpolate(
        input,
        [index - 1, index, index + 1],
        [-ITEM_WIDTH * 0.1, 0, ITEM_WIDTH * 0.1],
        Extrapolate.CLAMP
      );

      const scale = interpolate(
        input,
        [index - 1, index, index + 1],
        [0.9, 1, 0.9],
        Extrapolate.CLAMP
      );

      return {
        transform: [{ translateX }, { scale }],
      };
    });
    return (
        
        <Pressable
        onPress={() => router.push({
          pathname: "/movieDetails",
          params: { movie: JSON.stringify(item) }
        })} 
        style={styles.itemContainer}>
          <LinearGradient colors={['rgba(16,16,17,0.2)', 'rgba(16,16,17,0.3)']} style={tw`rounded-lg h-[${ITEM_HEIGHT}px] `}>
          <Animated.View style={[styles.imageContainer, animatedStyle]}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path }`}} style={styles.image} />
        </Animated.View>
        <Text style={tw` p-4 absolute bottom-10 text-xl text-white font-bold left-0`}>{item.title}</Text>
        </LinearGradient>
      </Pressable>
    );
  };

  if (!data) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULL_ITEM_WIDTH}
        decelerationRate="fast"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
      >
        {data.map((item, index) => (
          <View key={item.id} style={{ width: FULL_ITEM_WIDTH }}>
            {renderItem({ item, index })}
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    // paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2 - SPACING,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: SPACING,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    width: ITEM_WIDTH * 1,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ParallaxCarousel;