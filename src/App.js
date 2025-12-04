
import Movies from './Movies';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import MoviesDetails from './MoviesDetails';
import Home from './Home';
//import MoviesGbt from './MoviesGbt';

function App() {
  return (
    <div className="moviesPage">
      
      
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route    path='/movies'  element={<Movies />}/>
        <Route path="*" element={<NotFound />} />
        <Route path="movies/:id" element={<MoviesDetails />} />


      </Routes>
    </div>
  );
}

export default App;
