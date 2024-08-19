import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import tw from 'twrnc'; // Assuming you're using tailwind-rn

interface MovieDataType {
  title: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  overview: string;
  genres: { name: string }[];
  production_companies: { name: string }[];
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
}

type Props = {
  movieData: MovieDataType | undefined;
};

const About = ({ movieData }: Props) => {

  if (!movieData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const {
    title,
    poster_path,
    release_date,
    runtime,
    vote_average,
    overview,
    genres,
    production_companies,
    budget,
    revenue,
    status,
    tagline,
  } = movieData;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.tagline}>{tagline}</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.info}>{status}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Release Date:</Text>
          <Text style={styles.info}>{release_date}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Runtime:</Text>
          <Text style={styles.info}>{runtime} minutes</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.info}>{vote_average.toFixed(1)} / 10</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Genres:</Text>
          <Text style={styles.info}>{genres.map(genre => genre.name).join(', ')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Budget:</Text>
          <Text style={styles.info}>${budget.toLocaleString()}</Text>
        </View>
 
        <View style={styles.row}>
          <Text style={styles.label}>Revenue:</Text>
          <Text style={styles.info}>${revenue.toLocaleString()}</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Production Companies</Text>
        {production_companies.map((company, index) => (
            <View key={index} style={[tw`bg-gray-100 p-4 rounded-full flex gap-4`,styles.row]}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${company.logo_path}` }}
            style={tw`w-8 h-8 rounded-full`}/>
          <Text key={index} style={tw`text-violet-700 font-bold text-xl`}>{company.name}</Text>

             

            </View>
        ))}
        
      
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 16,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  label: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginRight: 8,
    color:'#685CF0',
  },
  info: {
    fontSize: RFPercentage(2),
    color:'#7D7E83',

  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});

export default About;