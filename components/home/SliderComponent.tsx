import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableWithoutFeedback, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import { getLatestMovies, Movie } from '../../utils/home/helpers';
import Button from '../Button';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Skeleton } from '@rneui/base'
import { router } from 'expo-router';
const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 40; // Adjust this value as needed

export default function SliderComponent() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        try {
            let fetchedMovies = await getLatestMovies();
            if (fetchedMovies) {
                setMovies(fetchedMovies.slice(0, 5)); // Only use the first 5 movies
            }
        } catch (error) {
            console.log('error ', error);
        }
    };

    const renderSlide = useCallback(({ item: movie }) => (
        <Pressable
        onPress={() => router.push({
            pathname: "/movieDetails",
            params: { movie: JSON.stringify(movie) }
          })}         style={[tw`  rounded-lg overflow-hidden  `, { width: ITEM_WIDTH }]}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
                style={[tw`h-[200px] w-full  rounded-md`, { objectFit: 'cover' }]}
            />

            <View style={[tw`left-[-45px] absolute h-[350px] w-[110%] rounded`, {
                transform: [{ rotate: '90deg' }],
            }]}>
                <LinearGradient
                    colors={['rgba(104, 92, 240, 0)', 'rgba(104, 92, 240,1 )']}
                    style={tw`absolute top-[-10px] left-[28px] right-0 bottom-0`}
                />
            </View>
            <View style={tw`absolute top-5 text-2xl font-bold px-4 flex gap-1 items-start`}>
                <Text style={[tw`text-xl text-white font-bold`, { fontSize: RFPercentage(1.9) }]}>
                    Watch popular
                </Text>
                <Text style={[tw`text-xl text-white font-bold`, { fontSize: RFPercentage(1.6) }]}>
                    movies {movie.title}
                </Text>
                <Text style={[tw`text-sm max-w-[200px] text-gray-400 font-bold`, { fontSize: RFPercentage(1.3) }]}>
                    {movie.overview.slice(0, 60)}...
                </Text>
                <Button
                    title='Watch Now'
                    style={tw`bg-white p-2 m-0 mt-2 px-8 min-w-[20px] self-start`}
                    textStyle={tw`text-sm text-violet-400 font-bold`}
                />
            </View>
        </Pressable>
    ), []);

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }, []);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    };

    const LoadingSkeleton =
        () => (
            <Skeleton
                animation='wave'
                style={tw`bg-gray-300 rounded-xl h-[180px] mb-4 w-full`} />
        );
    if (movies.length === 0) {
        return <LoadingSkeleton />;
    }
    return (
        <View style={tw`h-[220px] mb-8`}>
            <FlatList
                ref={flatListRef}
                data={movies}
                renderItem={renderSlide}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                contentContainerStyle={tw` `}
            />
            <View style={tw`flex-row justify-center mt-2`}>
                {movies.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            tw`h-[10px] mx-2 rounded-full`,
                            index === activeIndex ? tw`bg-violet-700 w-[50px]` : tw`bg-violet-400 w-[10px]`
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 120,
        position: 'relative',
    },
});