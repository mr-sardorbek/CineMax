import {
  getMoviesByGenre,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/services/tmdbAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async () => {
    const data = await getTrendingMovies();
    return data.results;
  },
);

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    const data = await getPopularMovies();
    return data.results;
  },
);

export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRatedMovies",
  async () => {
    const data = await getTopRatedMovies();
    return data.results;
  },
);

export const fetchNowPlayingMovies = createAsyncThunk(
  "movies/fetchNowPlayingMovies",
  async () => {
    const data = await getNowPlayingMovies();
    return data.results;
  },
);

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async () => {
    const data = await getUpcomingMovies();
    return data.results;
  },
);

export const fetchMoviesByGenre = createAsyncThunk(
  "movies/fetchMoviesByGenre",
  async (genreId) => {
    const data = await getMoviesByGenre(genreId);
    return data.results;
  },
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    popularMovies: [],
    topRatedMovies: [],
    nowPlayingMovies: [],
    upcomingMovies: [],
    genreMovies: [],
    popularTVShows: [],
    topRatedTVShows: [],
    airingToday: [],
    onTheAir: [],
    trendingTVShows: [],
    similarMovies: [],
    searchResults: [],
    isTrailerOpen: false,
    loading: {
      trending: false,
      popular: false,
      topRated: false,
      nowPlaying: false,
      upcoming: false,
      genre: false,
    },
  },

  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    setUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    setGenreMovies: (state, action) => {
      state.genreMovies = action.payload;
    },
    setPopularTVsHows: (state, action) => {
      state.popularTVShows = action.payload;
    },
    setTopRatedShows: (state, action) => {
      state.topRatedTVShows = action.payload;
    },
    setAiringToday: (state, action) => {
      state.airingToday = action.payload;
    },
    setOnTheAir: (state, action) => {
      state.onTheAir = action.payload;
    },
    setTrendingTVShows: (state, action) => {
      state.trendingTVShows = action.payload;
    },
    setSimilarMovies: (state, action) => {
      state.similarMovies = action.payload;
    },
    setIsTrailerOpen: (state, action) => {
      state.isTrailerOpen = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading.trending = true;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading.trending = false;
      })
      .addCase(fetchTrendingMovies.rejected, (state) => {
        state.loading.trending = false;
      })

      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading.popular = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popularMovies = action.payload;
        state.loading.popular = false;
      })
      .addCase(fetchPopularMovies.rejected, (state) => {
        state.loading.popular = false;
      })

      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading.topRated = true;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRatedMovies = action.payload;
        state.loading.topRated = false;
      })
      .addCase(fetchTopRatedMovies.rejected, (state) => {
        state.loading.topRated = false;
      })

      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.loading.nowPlaying = true;
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.nowPlayingMovies = action.payload;
        state.loading.nowPlaying = false;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state) => {
        state.loading.nowPlaying = false;
      })

      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.loading.upcoming = true;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcomingMovies = action.payload;
        state.loading.upcoming = false;
      })
      .addCase(fetchUpcomingMovies.rejected, (state) => {
        state.loading.upcoming = false;
      })

      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading.genre = true;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.genreMovies = action.payload;
        state.loading.genre = false;
      })
      .addCase(fetchMoviesByGenre.rejected, (state) => {
        state.loading.genre = false;
      });
  },
});

export const {
  setLoading,
  setMovies,
  setPopularTVsHows,
  setTopRatedShows,
  setAiringToday,
  setOnTheAir,
  setTrendingTVShows,
  setSimilarMovies,
  setIsTrailerOpen,
  setSearchResults,
} = moviesSlice.actions;

export default moviesSlice.reducer;
