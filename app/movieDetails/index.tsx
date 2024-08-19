import { View, Text } from 'react-native'
import React from 'react'
import { Movie } from '../../utils/home/helpers'
import MovieDetailsScreen from '../../components/MovieDetailsScreen/MovieDetailsScreen'
import { useLocalSearchParams } from 'expo-router'


const movieDetails = () => {
  const params = useLocalSearchParams()
  const {movie} = params 
  return (
   <MovieDetailsScreen movie={movie}/>
  )
}

export default movieDetails