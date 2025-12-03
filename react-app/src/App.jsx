import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Movies } from './pages/Movies'
import { TVSeries } from './pages/TVSeries'
import { SearchPage } from './pages/SearchPage'
import { MyLayout } from './components/MyLayout'
import { ContentPagination } from './components/ContentPagination'
import { Genres } from './components/Genres'
import { MyBottomNav } from './components/MyBottomNav'
import { MyCard } from './components/MyCard'
import { MySpinner } from './components/MySpinner'
import { PageLayout } from './components/PageLayout'
import { SingleChip } from './components/SingleChip'

export default function App() {
  return (
  <>
  <Routes>
      <Route path='/' element={<MyLayout/>} >
        <Route path='/' element={<Movies />} />
        <Route path='/tvseries' element={<TVSeries />} />
        <Route path='/search' element={<SearchPage />} />
      </Route>
    </Routes>
  </>
  )
}

