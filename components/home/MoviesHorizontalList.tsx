import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Movie } from '../../utils/home/helpers'
import tw from 'twrnc'
import { FlatList } from 'react-native'
import { Skeleton } from '@rneui/base'
import { router } from 'expo-router'

type Props = {
    recommendMovies: Movie[],
}

const { width: screenWidth } = Dimensions.get('window');
const numColumns = 3;
const itemWidth = (screenWidth - 40) / numColumns; // 40 is total horizontal padding

const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableWithoutFeedback 
    onPress={() => router.push({
  pathname: "/movieDetails",
  params: { movie: JSON.stringify(item) }
})}   >
      <View  style={tw`mb-4 max-w-[${itemWidth}px]`}>

      <Image
        style={[tw`rounded-[14px]`, { width: itemWidth - 8, height: (itemWidth - 8) * 1.5 }]}
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        />
      <View style={tw`mt-2`}>
        <Text style={tw`text-sm font-bold`} numberOfLines={1}>{item.title}</Text>
        <Text style={tw`text-xs text-gray-600 mt-1`} numberOfLines={1}>
          {item?.genre_ids?.map(genreIdToString).join(', ')}
        </Text>
      </View>
        </View>
    </TouchableWithoutFeedback>
  );

const LoadingSkeleton = () => (
    <Skeleton
        animation='wave'
        style={[tw`bg-gray-300 rounded-xl mb-4`, { width: itemWidth - 8, height: (itemWidth - 8) * 1.5 }]}
    />
);

const MoviesHorizontalList = ({ recommendMovies }: Props) => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        // Force re-render of FlatList when recommendMovies changes
        setKey(prevKey => prevKey + 1);
    }, [recommendMovies]);

    return (
        <View style={tw``}>
            {recommendMovies.length === 0 && (
                <View style={tw`flex-row flex-wrap justify-between`}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <LoadingSkeleton key={item} />
                    ))}
                </View>
            )}
            {recommendMovies.length > 0 && (
                <FlatList
                    key={key}
                    data={recommendMovies}
                    renderItem={renderMovieItem}
                    keyExtractor={(item: Movie) => item.id.toString()}
                    numColumns={numColumns}
                    columnWrapperStyle={tw`justify-between`}
                />
            )}
        </View>
    )
}

export default MoviesHorizontalList

// ... (genreIdToString function remains the same)

// ... (genreIdToString function remains the same)

export const genreIdToString = (genreId: number) => {
    const genres: { [key: number]: string } = {
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      80: 'Crime',
      99: 'Documentary',
      18: 'Drama',
      10751: 'Family',
      14: 'Fantasy',
      36: 'History',
      27: 'Horror',
      10402: 'Music',
      9648: 'Mystery',
      10749: 'Romance',
      878: 'Science Fiction',
      10770: 'TV Movie',
      53: 'Thriller',
      10752: 'War',
      37: 'Western',
    };
    return genres[genreId] || 'Unknown';
  };