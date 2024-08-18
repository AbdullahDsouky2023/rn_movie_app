import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { getTopSearchedMovies, Movie } from '../../utils/home/helpers';
import tw from 'twrnc';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Skeleton } from '@rneui/base';

const RecommendMovies = () => {
  const [recommendMovies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const movies = await getTopSearchedMovies();
      setMovies(movies);
    };
    fetch();
  }, []);

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <View style={tw`flex mr-4  h-[280px] px-1`}>
      <Image
        style={tw`h-[180px] w-[125px] rounded-[14px]`}
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
      />
      <View style={tw`flex-1  max-h-[50px] mt-2 `}>
        <Text style={tw`text-sm font-bold max-w-[120px]`}>{item.title}</Text>
        <Text style={tw`text-sm text-gray-600 mt-1 max-w-[120px]`}>
          {item?.genre_ids?.map(genreIdToString).join(', ')}
        </Text>
      </View>
    </View>
  );

  const LoadingSkeleton = 
  () => (
       <Skeleton
animation = 'wave'
style={tw`bg-gray-300 rounded-xl h-[200px] mb-4 w-[125px] `}/>
  );
 
  return (
    <View>
        <View style={tw`mb-4 flex justify-between flex-row`}>
            <Text style={[tw` font-bold`,{
                fontSize:RFPercentage(2)
            }]}>
                Recommend Movies
            </Text>
            <Text style={tw`font-bold text-violet-800`}>
                See All
            </Text>
        </View>
        {
          
          recommendMovies.length === 0 && 
          <View style={tw`flex flex-row gap-4`}>
            {

              [1,2,3,4,5].map((item)=>(
                <LoadingSkeleton key={item}/>
              ))
            }
          </View>
          }
        {
          recommendMovies.length > 0 &&
        <FlatList
          data={recommendMovies}
          renderItem={renderMovieItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={tw``}
          horizontal={true}
        />
        }
   
      </View>
  );
};

export default RecommendMovies;

// Helper function to convert genre IDs to genre names
const genreIdToString = (genreId: number) => {
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