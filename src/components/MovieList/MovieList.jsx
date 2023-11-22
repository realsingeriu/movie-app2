import "./MovieList.css";
import Fire from '../../assets/fire.png';
import _ from 'lodash';

import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";

export default function MovieList({ type, title, emoji }) {
  const [movies, setMovies] = useState([])
  const [filterMovies, setFilterMovies] = useState([]);
	const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
		by: 'default',
		order: 'asc',
	});

  async function fetchMovies() {
   
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${import.meta.env.VITE_MOVIE_API}&language=ko`
    );
    const data = await response.json();
		setMovies(data.results);
    setFilterMovies(data.results);
   };
   function handleFilter(rate){
    if (minRating === rate) {
			setMinRating(0);
			setFilterMovies(movies);
		} else {
			setMinRating(rate); // 최소 점수 세팅
    const filtered = movies.filter((movie) => movie.vote_average >= rate);
    setFilterMovies(filtered);
		}
  }
    const handleSort = (e) => {
		const { name, value } = e.target;
		setSort((prev) => ({ ...prev, [name]: value }));
	  };
    
    useEffect(()=>{
      if(sort.by !== 'default'){
      const sortedMovies=_.orderBy(filterMovies, [sort.by], [sort.order])
      setFilterMovies(sortedMovies);
    }
    },[sort])
    
    useEffect(()=>{
     fetchMovies();
   }, []);

  

	return (
		<section className='movie_list' id={`${type}`}>
			<header className='align_center movie_list_header'>
				<h2 className='align_center movie_list_heading'>
					{title} <img src={emoji} alt='fire emoji' className='navbar_emoji' />
				</h2> 

				<div className='align_center movie_list_fs'>
					<ul className='align_center movie_filter'>
						<li onClick={()=>handleFilter(8)} className={minRating===8?'movie_filter_item active' : 'movie_filter_item'}>8+ Star</li>
						<li onClick={()=>handleFilter(7)} className={minRating===7?'movie_filter_item active' : 'movie_filter_item'}>7+ Star</li>
						<li onClick={()=>handleFilter(6)} className={minRating===6?'movie_filter_item active' : 'movie_filter_item'}>6+ Star</li>
					</ul>

					<select name='by' id='by' onChange={handleSort} className='movie_sorting'>
						<option value='default'>정렬기준</option>
						<option value='release_date'>출시일</option>
						<option value='vote_average'>평점</option>
					</select>
					<select name='order' id='order' onChange={handleSort}  className='movie_sorting'>
						<option value='asc'>순서대로</option>
						<option value='desc'>큰순으로</option>
					</select>
				</div>
			</header>

			<div className='movie_cards'>
        
        {filterMovies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</section>
	);
};