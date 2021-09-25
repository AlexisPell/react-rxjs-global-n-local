import React, { useEffect } from 'react';
import { PokemonProvider, usePokemonContext } from './store';
import Search from './Search';
import Deck from './Deck';
import { Grid } from '@mui/material';

interface AppProps {}
const App: React.FC<AppProps> = ({}) => {
  const { pokemon$, rawPokemon$ } = usePokemonContext();

  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => rawPokemon$.next(data));
    pokemon$.subscribe(console.log);
  }, []);

  return (
    <PokemonProvider>
      <Grid container>
        <Grid item xs={6}>
          <Search />
        </Grid>
        <Grid item xs={6}>
          <Deck />
        </Grid>
      </Grid>
    </PokemonProvider>
  );
};

export default App;
