import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, TouchableWithoutFeedback } from 'react-native';
import { getTopSearchedMovies, Movie } from '../../utils/home/helpers';
import tw from 'twrnc';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { router } from 'expo-router';
import { Skeleton } from '@rneui/base';
type props = {
    outSide:boolean,
    searchQuery?:string
}
const TopSearchMovies = ({outSide=true,searchQuery}:props) => {
  const [TopSearchMovies, setMovies] = useState<Movie[]>([]);
  const filteredCategories = TopSearchMovies?.filter((category:Movie) =>
    category?.title.toLowerCase().includes(searchQuery?.toLowerCase())
  );
  useEffect(() => {
    const fetch = async () => {
      const movies = await getTopSearchedMovies();
      setMovies(movies);
    };
    fetch();
  }, []);

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableWithoutFeedback 
    onPress={() => router.push({
      pathname: "/movieDetails",
      params: { movie: JSON.stringify(item) }}
    )}

 >
      <View    style={tw`flex flex-row mb-4  h-[130px] px-1 items-center`}>

      <Image
        style={tw`h-[130px] w-[170px] rounded-[14px]`}
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
        />
      <View style={tw`flex-1  max-h-[50px] ml-4 `}>
        <Text style={[tw`text-sm font-bold max-w-[120px]`,{
          fontSize:RFPercentage(1.8)
        }]}>{item.title}</Text>
        <Text style={tw`text-sm text-gray-600 mt-1 max-w-[120px]`}>
          {item?.genre_ids?.map(genreIdToString).join(', ')}
        </Text>
      </View>
      <Pressable>
        <Image 
        source={require('../../assets/tabs/video-circle.png')}
        style={tw`h-[29px] w-[29px]`}
        />
      </Pressable>
        </View>
    </TouchableWithoutFeedback>
  );
  const LoadingSkeleton = 
  () => (
       <Skeleton
animation = 'wave'
style={tw`bg-gray-300 rounded-xl h-[200px] mb-4 w-full `}/>
  );
  return (
    <View style={tw`mt-4`}>
        <View style={tw`mb-4 flex justify-between flex-row`}>
            <Text style={[tw` font-bold`,{
                fontSize:RFPercentage(2)
            }]}>
                Top Searches
            </Text>
            {
                outSide &&
            <Text style={tw`font-bold text-violet-800`} onPress={()=>router.push('/topSearches')}>
                
                See All
            </Text>
            }
        </View>
        {
          
          TopSearchMovies.length === 0 && 
          <View style={tw`flex  gap-4`}>
            {

              [1,2,3,4,5].map((item)=>(
                <LoadingSkeleton key={item}/>
              ))
            }
          </View>
          }
    <FlatList
      data={filteredCategories?.length > 0 ? filteredCategories : TopSearchMovies}
      renderItem={renderMovieItem}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={tw``}
      />
      </View>
  );
};

export default TopSearchMovies;

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