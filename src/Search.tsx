import { Checkbox, Input } from '@mui/material';
import { useObservableState } from 'observable-hooks';
import React, { useMemo, useState } from 'react';
import { BehaviorSubject, combineLatestWith, map } from 'rxjs';
import { Pokemon, usePokemonContext } from './store';

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
  const { deck$, pokemon$, rawPokemon$, selected$ } = usePokemonContext();
  const search$ = useMemo(() => new BehaviorSubject(''), []);
  const pokemon = useObservableState<Pokemon[]>(pokemon$, []);

  // const filteredPokemon = useMemo(
  //   () => pokemon.filter((p) => p.name.toLowerCase().includes(search$.value.toLowerCase())),
  //   [pokemon]
  // );
  const [filteredPokemon] = useObservableState(
    () =>
      pokemon$.pipe(
        combineLatestWith(search$),
        map(([pokemon, search]) => pokemon.filter((p) => p.name.toLowerCase().includes(search$.value.toLowerCase())))
      ),
    []
  );

  return (
    <div>
      <Input value={search$.value} onChange={(e) => search$.next(e.target.value)} fullWidth />
      <div>
        {filteredPokemon.map((p) => (
          <div key={p.name}>
            <Checkbox
              checked={p.selected}
              onChange={() => {
                if (selected$.value.includes(p.id)) {
                  selected$.next(selected$.value.filter((id) => id !== p.id));
                }
                if (!selected$.value.includes(p.id)) {
                  selected$.next([...selected$.value, p.id]);
                }
              }}
            />
            <strong>{p.name}</strong> - {p.power}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
