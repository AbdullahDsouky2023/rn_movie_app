import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import { fetchMovieDetails, Movie } from '../../utils/home/helpers'
import { ScrollView } from 'react-native-virtualized-view'
import {  AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router, Slot } from 'expo-router'
import { FlatList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import RecommendMovies from '../home/RecommedMovies'
import TopSearchMovies from '../home/TopSearch'
import About from './AboutComponent'
type Props = {
  movie: Movie
}
/**
 * Renders the movie details screen, displaying information about a specific movie.
 *
 * @param {Props} props - The props object containing the movie data.
 * @param {Movie} props.movie - The movie object to display details for.
 * @returns {JSX.Element} - The rendered movie details screen.
 */

const tabs = [
  { id: '1', name: 'Overview' },
  { id: '2', name: 'Suggested' },
  { id: '3', name: 'About' },
]

const MovieDetailsScreen = ({ movie }: Props) => {
  const [fullMovie, setFullMovie] = React.useState<Movie | null>(null)
  const [activeTab, setActiveTab] = React.useState('1')
  const parsedMovie = JSON.parse(movie as string) as Movie

  // console.log(parsedMovie)
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMovieDetails(parsedMovie.id)
      setFullMovie(data)
      // console.log(data)
    }
    fetch()
  }, [parsedMovie.id])

  return (
    <View style={tw`flex-1`}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${parsedMovie.poster_path}` }}
        style={tw`w-full h-[420px]`}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={tw`absolute  w-full h-[420px]`}
      >
        <View style={tw`flex-row items-center justify-between px-4 mt-16`}>
          <AntDesign onPress={() => router.back()} name="arrowleft" size={RFPercentage(3.3)} color="white" />
        </View>
        <View style={tw`px-4 absolute bottom-[40px] flex gap-4 w-full`}>
          <Text style={tw`text-white text-2xl font-bold text-center`}>
            {parsedMovie?.title}
          </Text>
          <Text style={tw`text-gray-200 text-lg text-center`}>
            {parsedMovie?.overview.slice(0, 90)}
          </Text>
          <View style={tw`flex-row gap-4 mt-4 items-center justify-center`}>
            <View style={tw`flex-row items-center gap-4`}>
              <Feather name="calendar" size={24} color="white" />
              <Text style={tw`text-white text-lg font-bold`}>
                {parsedMovie?.release_date.slice(0, 4)}
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-4`}>
              <MaterialIcons name="movie" size={24} color="white" />  
              <Text style={tw`text-white text-sm font-bold`}>
                {fullMovie?.genres?.map((genre) => genre?.name).join(', ')}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row items-center justify-center gap-4 mt-4`}>
            <TouchableOpacity 
            onPress={()=>router.push('subscription')}
            style={tw`flex-row items-center gap-4 bg-[#685CF0] px-4 py-2 rounded-full`}>
              <Image
                source={require('../../assets/tabs/video-circle1.png')}
                style={tw`w-6 h-6`}
              />
              <Text style={tw`text-white text-lg font-bold`}>
                Play
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-row items-center bg-white px-4 py-2 rounded-full`}>
              <Image
                source={require('../../assets/tabs/receive-square.png')}
                style={[tw`w-[25px] h-[25px]`, {
                  objectFit: 'contain'
                }]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-row items-center bg-white px-4 py-2 rounded-full`}>
              <Image
                source={require('../../assets/tabs/mirroring-screen.png')}
                style={[tw`w-[25px] h-[25px]`, {
                  objectFit: 'cover'
                }]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-row items-center bg-white px-4 py-2 rounded-full`}>
              <Image
                source={require('../../assets/tabs/share.png')}
                style={[tw`w-[25px] h-[25px]`, {
                  objectFit: 'cover'
                }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <FlatList
        data={tabs}
        renderItem={({ item }) => <RenderCategory
          item={item}
          activeCategory={activeTab}
          setActiveCategory={setActiveTab}
        />}
        scrollEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={tw`bg-white max-h-[90px]`}
        contentContainerStyle={tw`flex flex-row gap-4 min-w-full bg-white h-[90px]`}
        keyExtractor={(item) => item.id}
      />
      <ScrollView style={tw`bg-white flex-1 relative`} showsVerticalScrollIndicator={false}>
        {activeTab === '1' && (
          <View style={tw`flex-1 px-4`}>
            <Text style={tw`text-gray-500 text-lg mt-4 ml-4`}>
              {parsedMovie?.overview}
            </Text>
          </View>
        )}
        {activeTab === '2' && (
          <View style={tw`flex-1 px-4`}>
            <TopSearchMovies outSide={true} />
          </View>
        )}
        {activeTab === '3' && (
  fullMovie ? (
    <About movieData={fullMovie} />
  ) : (
    <ActivityIndicator size="large" color="#0000ff" />
  )
)}
      </ScrollView>
    </View>
  )
}

export default MovieDetailsScreen

type renderCategoryProps = {
  item: {
    id: string
    name: string
  }
  setActiveCategory: (id: string) => void
  activeCategory: string
}

const RenderCategory = ({ item,setActiveCategory,activeCategory }:renderCategoryProps) => (
  <TouchableOpacity onPress={() => setActiveCategory(item.id)}>
    <LinearGradient
      colors={['rgba(255,255,255,0.1)', 'transparent']}
      style={[tw`bg-white p-4 mt-4 ml-2  w-[150px] rounded-2xl items-center  ${activeCategory === item.id ? 'bg-white' : ''}`,{
      
      }]}
    >
      <Text style={[tw`text-slate-600   font-bold ${activeCategory === item.id ? 'text-violet-600' : ''}`,{
        fontFamily:'Poppins-Regular',
        fontSize:RFPercentage(1.7),
       
      }]}>
        {item.name}
      </Text>
      {
        activeCategory === item.id && (
          <View style={tw`absolute bg-violet-600 h-[5px] bottom-0 w-full rounded-md`}/>
        )
      }
    </LinearGradient>
  </TouchableOpacity>
);

