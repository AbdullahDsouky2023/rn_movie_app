import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import MoviesHorizontalList from '../home/MoviesHorizontalList';
import { fetchMovies } from '../../utils/home/helpers';
import { ScrollView } from 'react-native-virtualized-view';


const categories = [
  { id: '1', name: 'All' },
  { id: '28', name: 'Action' },
  { id: '35', name: 'Comedy' },
  { id: '18', name: 'Drama' },
  { id: '27', name: 'Horror' },
  { id: '10749', name: 'Romance' },
  { id: '878', name: 'Science Fiction' },
  { id: '53', name: 'Thriller' },
];

export default function CategoryComponent() {
  const [activeCategory, setActiveCategory] = useState('1');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies(activeCategory, setMovies, setLoading);
  }, [activeCategory]);

  

  const renderCategory = ({ item }) => (
    <TouchableOpacity onPress={() => setActiveCategory(item.id)}>
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'transparent']}
        style={tw`bg-gray-200 p-4 rounded-xl ${activeCategory === item.id ? 'bg-violet-800' : ''}`}
      >
        <Text style={tw`text-slate-700 font-bold ${activeCategory === item.id ? 'text-white' : ''}`}>
          {item.name}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <>
    <View>
    <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex flex-row gap-4`}
        keyExtractor={(item) => item.id}
      />
    </View>
      <ScrollView showsVerticalScrollIndicator={false} style={tw`mt-4`}>
        <Text style={tw`text-2xl font-bold mb-4`}>
          Most Popular
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          
          <MoviesHorizontalList recommendMovies={movies} />
        )}
      </ScrollView>
        </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});