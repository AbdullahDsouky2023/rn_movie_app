import axios from 'axios';

const API_KEY = 'ab12ca60329b73e4052daec03284bc12';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

export const getLatestMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
    console.log('movies ',response.data.results)
    return response.data.results;
  } catch (error) {
    console.error('Error fetching latest movies:', error);
    return [];
  }
};

export const getPopularTVSeries = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular TV series:', error);
    return [];
  }
};