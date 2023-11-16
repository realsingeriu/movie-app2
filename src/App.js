import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";

function App() {
  const [favourites, setFavourites] = useState([]); // 선호작 추가하기
  const [movies, setmovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // 영화 데이터를 가져오기
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=6f780949&s=${searchValue}`;
    const response = await fetch(url);
    const responseJson = await response.json(); // 문자열을 객체형식으로 변환

    // 영화정보를 업데이트
    if (responseJson.Search) {
      setmovies(responseJson.Search);
    }
  };

  useEffect(() => {
    if (searchValue.length > 1) {
      getMovieRequest(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    // 처음 시작시 movieFavourites가 있으면 가져와서 초기값 입력
    const movieFavourites = JSON.parse(localStorage.getItem("Favourites"));
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  // 로컬 스토리지에 선화작 저장하기
  const saveToLocalStorage = (items) => {
    localStorage.setItem("favourites", JSON.stringify(items));
  };

  // 선화작리스트에 새호운 영화를 추가한다.
  const addFavouriteMovie = (movie) => {
    const newList = [...favourites, movie];
    setFavourites(newList);
    saveToLocalStorage(newList);
  };

  const removeMovie = (movie) => {
    const newList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newList);
    saveToLocalStorage(newList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row align-items-center my-4">
        <MovieListHeading heading="영화 검색과 선호작 등록" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <ScrollContainer className="row scroll-container">
        {movies && (
          <MovieList
            movies={movies}
            addMovie={true}
            handleClick={addFavouriteMovie}
          />
        )}
      </ScrollContainer>
      <div className="row align-items-center my-4">
        <MovieListHeading heading="내 선호작" />
        <MovieList
          movies={favourites}
          addMovie={false}
          handleClick={removeMovie}
        ></MovieList>
      </div>
    </div>
  );
}

export default App;
