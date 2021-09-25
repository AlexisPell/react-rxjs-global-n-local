import { BehaviorSubject, map, combineLatestWith } from 'rxjs';
import { useContext, createContext } from 'react';

export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  power?: number;
  selected?: boolean;
}

const rawPokemon$ = new BehaviorSubject<Pokemon[]>([]);

const pokemonWithPower$ = rawPokemon$.pipe(
  map((pokemon) =>
    pokemon.map((p) => ({
      ...p,
      power: p.hp + p.attack + p.defense + p.special_attack + p.special_defense + p.speed,
    }))
  )
);

const selected$ = new BehaviorSubject<number[]>([]);

const pokemon$ = pokemonWithPower$.pipe(
  combineLatestWith(selected$),
  map(([pokemon, selected]) =>
    pokemon.map((p) => ({
      ...p,
      selected: selected.includes(p.id),
    }))
  )
);

// // // // Deck
const deck$ = pokemon$.pipe(map((pokemon) => pokemon.filter((p) => p.selected)));

// // // // CONTEXT
const PokemonContext = createContext({
  rawPokemon$,
  pokemon$,
  selected$,
  deck$,
});
// Use Context
export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider: React.FC = ({ children }) => (
  <PokemonContext.Provider value={{ rawPokemon$, pokemon$, selected$, deck$ }}>{children}</PokemonContext.Provider>
);
