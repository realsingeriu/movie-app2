import './App.css'
import MovieList from './components/MovieList/MovieList';
import Navbar from './components/Navbar/Navbar'
import Fire from "./assets/fire.png";
import Star from "./assets/glowing-star.png";
import Party from "./assets/partying-face.png";
import SearchBox from './components/MovieList/SearchBox';
import { useEffect, useState } from 'react';

export default function App(props) {
  const [searchValue, setSearchValue] = useState('');
	const [movies, setMovies] = useState([]);

	const getMovieRequest = async (searchValue) => {

		const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_MOVIE_API}&query=${searchValue}&language=ko`;

    try {
      const response = await fetch(url);
      const responseJson = await response.json();
  
      if (responseJson.results) {
        console.log(responseJson.results);
        setMovies(responseJson.results);
        
      } else {
        // 검색 결과가 없을 경우 초기화
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

	useEffect(() => {
    if (searchValue.length > 3) {
      getMovieRequest(searchValue);
    }
  }, [searchValue]);
  return (
    <div className='app'>
      <Navbar />
        <MovieList type='popular' title='인기작품' emoji={Fire} movies={movies} />
        <MovieList type='top_rated' title='최고평점' emoji={Star} movies={movies} />
        <MovieList type='upcoming' title='예정작품' emoji={Party} movies={movies} />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />	
    </div>
  );
}

