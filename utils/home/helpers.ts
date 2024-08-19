import axios from 'axios';
import React from 'react';

const API_KEY = 'ab12ca60329b73e4052daec03284bc12';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
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

// New function for recommended movies
export const getRecommendedMovies = async (movieId: number): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    return [];
  }
};

// New function for top searched movies
export const getTopSearchedMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top searched movies:', error);
    return [];
  }
};

interface FetchMovies {
  categoryId: string;
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const fetchMovies = async (categoryId,setMovies,setLoading) :  Promise<void> => {
  setLoading(true);
  try {
    let url;
    if (categoryId === '1') {
      url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${categoryId}&page=1`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.results);
  } catch (error) {
    console.error('Error fetching movies:', error);
  } finally {
    setLoading(false);
  }
};


export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};