
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, getTypes } from './redux/action';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';
import Detail from './routes/Detail/Detail';
import LandingPage from './routes/LandingPage/LandingPage';
import { useEffect } from 'react';


function App() {
  const pokemons = useSelector(state => state.pokemons)
  const types = useSelector(state=>state.types)
  const loading = useSelector(state => state.loading)
  const error = useSelector(state => state.error)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  // if (loading) {
  //   return console.log("cargando");
  // } else if(!loading){
  //   console.log("Cargado");
  // }

  // if (error) {
  //   return console.log(error.message);
  // }


  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={ <LandingPage/> } />
        <Route path='pokemons' element={ <Home loading={loading} pokemons={pokemons}/> } />
        <Route path='detail/:id' element={ <Detail /> } />
      </Routes>
    </div>
  )
}

export default App
