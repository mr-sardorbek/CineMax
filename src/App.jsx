import { Route, Routes } from 'react-router-dom'
import { Home, MovieDetails, Movies, NotFound, PersonDetails, Profile, Search, Trending, TVshows } from './pages'
import MainLayout from './layouts/mainLayouts'


const App = () => {
  return (
    <MainLayout>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movies' element={<Movies/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/tv-shows' element={<TVshows/>}/>
      <Route path='/trending' element={<Trending/>}/>
      <Route path='/movie/:id' element={<MovieDetails/>}/>
      <Route path='/person/:id' element={<PersonDetails/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </MainLayout>
  )
}

export default App
