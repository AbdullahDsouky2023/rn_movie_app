import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { getTopSearchedMovies, Movie } from '../../utils/home/helpers';
import tw from 'twrnc';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Skeleton } from '@rneui/base';
import MoviesHorizontalList from './MoviesHorizontalList';
import { router } from 'expo-router';

const RecommendMovies = () => {
  const [recommendMovies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const movies = await getTopSearchedMovies();
      setMovies(movies);
    };
    fetch();
  }, []);

  

 
  return (
    <View>
        <View style={tw`mb-4 flex justify-between flex-row`}>
            <Text style={[tw` font-bold`,{
                fontSize:RFPercentage(2)
            }]}>
                Recommend Movies
            </Text>
            <Text 
            onPress={()=>router.push('/topSearches')}
            style={tw`font-bold text-violet-800`}>
                See All
            </Text>
        </View>
   <MoviesHorizontalList recommendMovies={recommendMovies}/>
       
      </View>
  );
};

export default RecommendMovies;

