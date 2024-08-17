import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import HeaderComponent from '../auth/signin/HeaderComponent';
import Button from '../Button';
import { router } from 'expo-router';

type Category = string;

const categories: Category[] = [
  "Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance", "Thriller",
  "Adventure", "Animation", "Documentary", "Fantasy", "Mystery"
];

const FavouriteCategories: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (category: Category): void => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(category)
        ? prevSelected.filter(item => item !== category)
        : [...prevSelected, category]
    );
  };

  const renderCategoryItem: ListRenderItem<Category> = ({ item }) => (
    <TouchableOpacity
      style={tw`flex-row min-w-[120px] gap-4 rounded-full items-center justify-between p-4 border border-gray-300`}
      onPress={() => toggleCategory(item)}
    >
      <Text style={tw`text-lg text-center`}>{item}</Text>
      {selectedCategories.includes(item) && (
        <Ionicons name="checkmark-circle" size={24} color="green" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white px-4`}>
      <HeaderComponent title='Choose Interests' back={false} />
      <Text style={tw`text-lg text-slate-500 text-center my-4 px-4`}>
      Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod 
      </Text>
      <View style={tw`p-4 `}>
        <View style={tw`border border-gray-300 flex flex-row gap-2 items-center rounded-lg p-2 mb-4 rounded-full p-4`}>

        <AntDesign name='search1'/>
        <TextInput
          style={tw``}
          placeholder="Search"
          
          value={searchQuery}
          onChangeText={setSearchQuery}
          />
          </View>
        <FlatList<Category>
          data={filteredCategories}
          renderItem={renderCategoryItem}
          contentContainerStyle={[tw`flex flex-row gap-4 w-full `,{flexWrap:'wrap'}]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: Category) => item}
        />
      {
        selectedCategories?.length > 0 && <Button title='Next' 
        style={tw`mt-4`}
        onPress={()=>{
            console.log('sekecte',selectedCategories)
            router.push('/tabs/home')
        }} />
      }
      </View>
    </SafeAreaView>
  );
};

export default FavouriteCategories;