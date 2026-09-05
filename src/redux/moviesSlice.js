import {
  getAiringToday,
  getMovieCredits,
  getMovieDetails,
  getMoviesByGenre,
  getMovieVideos,
  getNowPlayingMovies,
  getOnTheAir,
  getPersonCredits,
  getPersonDetails,
  getPopularMovies,
  getPopularTVShows,
  getSimilarMovies,
  getTopRatedMovies,
  getTopRatedTVShows,
  getTrendingMovies,
  getTrendingTVShows,
  getUpcomingMovies,
  searchMulti,
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

export const fetchPopularTVShows = createAsyncThunk(
  "movies/fetchPopularTVShows",
  async () => {
    const data = await getPopularTVShows();
    return data.results;
  },
);

export const fetchTopRatedTVShows = createAsyncThunk(
  "movies/fetchTopRatedTVShows",
  async () => {
    const data = await getTopRatedTVShows();
    return data.results;
  },
);

export const fetchAiringToday = createAsyncThunk(
  "movies/fetchAiringToday",
  async () => {
    const data = await getAiringToday();
    return data.results;
  },
);

export const fetchOnTheAir = createAsyncThunk(
  "movies/fetchOnTheAir",
  async () => {
    const data = await getOnTheAir();
    return data.results;
  },
);

export const fetchSearchMovies = createAsyncThunk(
  "movies/fetchSearchMovies",
  async (query) => {
    const data = await searchMulti(query);

    return data.results.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv",
    );
  },
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id) => {
    const data = await getMovieDetails(id);
    return data;
  },
);

export const fetchTrendingTVShows = createAsyncThunk(
  "movies/fetchTrendingTVShows",
  async () => {
    const data = await getTrendingTVShows();
    return data.results;
  },
);

export const fetchMovieVideos = createAsyncThunk(
  "movies/fetchMovieVideos",
  async (movieId) => {
    const data = await getMovieVideos(movieId);

    const officialTrailer = data.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official === true,
    );

    const trailer =
      officialTrailer ||
      data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      );

    return trailer || null;
  },
);

export const fetchMovieCredits = createAsyncThunk(
  "movies/fetchMovieCredits",
  async (movieId) => {
    const data = await getMovieCredits(movieId);
    return data;
  },
);

export const fetchSimilarMovies = createAsyncThunk(
  "movies/fetchSimilarMovies",
  async (movieId) => {
    const data = await getSimilarMovies(movieId);
    return data.results;
  },
);


export const fetchPersonDetails = createAsyncThunk(
  "movies/fetchPersonDetails",
  async (personId) => {
    const data = await getPersonDetails(personId);
    return data;
  },
);

export const fetchPersonCredits = createAsyncThunk(
  "movies/fetchPersonCredits",
  async (personId) => {
    const data = await getPersonCredits(personId);
    return data.cast;
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
    movieDetails: null,
    trailer: null,
    credits: null,
    isTrailerOpen: false,
    loading: {
      trending: false,
      popular: false,
      topRated: false,
      nowPlaying: false,
      upcoming: false,
      genre: false,
      popularTV: false,
      topRatedTV: false,
      airingToday: false,
      onTheAir: false,
      search: false,
      movieDetails: false,
      trailer: false,
      credits: false,
      similarMovies: false,
      trendingTV: false,
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
      })

      .addCase(fetchPopularTVShows.pending, (state) => {
        state.loading.popularTV = true;
      })
      .addCase(fetchPopularTVShows.fulfilled, (state, action) => {
        state.popularTVShows = action.payload;
        state.loading.popularTV = false;
      })
      .addCase(fetchPopularTVShows.rejected, (state) => {
        state.loading.popularTV = false;
      })

      .addCase(fetchTopRatedTVShows.pending, (state) => {
        state.loading.topRatedTV = true;
      })
      .addCase(fetchTopRatedTVShows.fulfilled, (state, action) => {
        state.topRatedTVShows = action.payload;
        state.loading.topRatedTV = false;
      })
      .addCase(fetchTopRatedTVShows.rejected, (state) => {
        state.loading.topRatedTV = false;
      })

      .addCase(fetchAiringToday.pending, (state) => {
        state.loading.airingToday = true;
      })
      .addCase(fetchAiringToday.fulfilled, (state, action) => {
        state.airingToday = action.payload;
        state.loading.airingToday = false;
      })
      .addCase(fetchAiringToday.rejected, (state) => {
        state.loading.airingToday = false;
      })

      .addCase(fetchOnTheAir.pending, (state) => {
        state.loading.onTheAir = true;
      })
      .addCase(fetchOnTheAir.fulfilled, (state, action) => {
        state.onTheAir = action.payload;
        state.loading.onTheAir = false;
      })
      .addCase(fetchOnTheAir.rejected, (state) => {
        state.loading.onTheAir = false;
      })

      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading.search = true;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading.search = false;
      })
      .addCase(fetchSearchMovies.rejected, (state) => {
        state.loading.search = false;
      })

      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading.movieDetails = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading.movieDetails = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.loading.movieDetails = false;
      })

      .addCase(fetchMovieVideos.pending, (state) => {
        state.loading.trailer = true;
      })
      .addCase(fetchMovieVideos.fulfilled, (state, action) => {
        state.loading.trailer = false;
        state.trailer = action.payload;
      })
      .addCase(fetchMovieVideos.rejected, (state) => {
        state.loading.trailer = false;
        state.trailer = null;
      })

      .addCase(fetchMovieCredits.pending, (state) => {
        state.loading.credits = true;
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.loading.credits = false;
        state.credits = action.payload;
      })
      .addCase(fetchMovieCredits.rejected, (state) => {
        state.loading.credits = false;
        state.credits = null;
      })

      .addCase(fetchSimilarMovies.pending, (state) => {
        state.loading.similarMovies = true;
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.loading.similarMovies = false;
        state.similarMovies = action.payload;
      })
      .addCase(fetchSimilarMovies.rejected, (state) => {
        state.loading.similarMovies = false;
        state.similarMovies = [];
      })

      .addCase(fetchTrendingTVShows.pending, (state) => {
        state.loading.trendingTV = true;
      })
      .addCase(fetchTrendingTVShows.fulfilled, (state, action) => {
        state.trendingTVShows = action.payload;
        state.loading.trendingTV = false;
      })
      .addCase(fetchTrendingTVShows.rejected, (state) => {
        state.loading.trendingTV = false;
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
