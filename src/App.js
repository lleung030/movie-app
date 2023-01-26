import './App.css';
import React, {useEffect, useState, useContext} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Protected from './components/Protected';
import { AuthContextProvider } from './contexts/AuthContext';
import Account from './views/Account';
import Home from './views/Home';
import SignIn from './views/SignIn';
import Navbar from './components/NavBar';
import Protected from './components/Protected';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a181ceb9`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites')
    );

    setFavorites(movieFavorites);
  
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
  }

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
      );

      setFavorites(newFavoriteList);
      saveToLocalStorage(newFavoriteList);
        
  };
  
  return (
  <div>
    <AuthContextProvider>

    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<SignIn />} />
    </Routes>
       
    {<SignIn /> ? (
          <div className="container-fluid movie-app">
          <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Movies'/>
            <SearchBox searchValue={searchValue} 
            setSearchValue={setSearchValue}/>
          </div>
          <div className="row">
            <MovieList movies={movies} 
            handleFavoritesClick={addFavoriteMovie} 
            favoriteComponent = {AddFavorites} />
          </div>
          <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Favorites'/>
          </div>
          <div className="row">
            <MovieList movies={favorites} 
            handleFavoritesClick={removeFavoriteMovie} 
            favoriteComponent = {RemoveFavorites} />
          </div>
        </div> 
      ) : (
        <Link to='/signin'>Sign in</Link>
      )}  
  
  {/* <div className="container-fluid movie-app">
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Movies'/>
      <SearchBox searchValue={searchValue} 
      setSearchValue={setSearchValue}/>
    </div>
    <div className="row">
      <MovieList movies={movies} 
      handleFavoritesClick={addFavoriteMovie} 
      favoriteComponent = {AddFavorites} />
    </div>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Favorites'/>
    </div>
    <div className="row">
      <MovieList movies={favorites} 
      handleFavoritesClick={removeFavoriteMovie} 
      favoriteComponent = {RemoveFavorites} />
    </div>
  </div>  */}
  </AuthContextProvider>
  </div>
  
  );
}

export default App;
