import { View, Text, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import HeaderComponent from '../auth/signin/HeaderComponent'
import SearchComponent from '../topSearch/SearchComponent'
import ParallaxCarousel from './ParrlaxCarsousel'
import { getLatestMovies, Movie } from '../../utils/home/helpers'
import { Skeleton } from '@rneui/base'
import CategoryComponent from './CategoryComponent'
import { ScrollView } from 'react-native-virtualized-view'
const { height, width } = Dimensions.get('window')
/**
 * Defines the props type for the `SearchScreen` component.
 */
type Props = {
}


const SearchScreen = (props: Props) => {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = useCallback(async () => {
        const movies = await getLatestMovies();
        setMovies(movies);
    }, []);
    console.log('te movies ', movies?.length)
    return (
        <SafeAreaView style={tw`flex-1 bg-white px-4 relative`}>
            <HeaderComponent title='Explore' back={false} />
            <ScrollView 
            showsVerticalScrollIndicator={false}
            >

            <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                {
                    movies?.length > 0 &&
                    <View style={tw`my-8  h-[190px] `}>
                        <ParallaxCarousel data={movies} />
                        </View>
                        
                }

            <CategoryComponent />
            
</ScrollView>
        </SafeAreaView>
    )
}

export default SearchScreen