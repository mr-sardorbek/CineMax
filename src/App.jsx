import { Route, Routes } from 'react-router-dom'
import { Home, Movies, NotFound, Profile, Search, Trending, TVshows } from './pages'
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
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </MainLayout>
  )
}

export default App
