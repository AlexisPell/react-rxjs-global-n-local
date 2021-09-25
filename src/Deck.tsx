import React from 'react';
import { useObservableState } from 'observable-hooks';
import { usePokemonContext } from './store';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';

interface DeckProps {}

const Deck: React.FC<DeckProps> = ({}) => {
  const { deck$ } = usePokemonContext();
  const deck = useObservableState(deck$, []);

  return (
    <div>
      <h4>Deck</h4>
      {deck.map((p) => (
        <Box key={p.id} sx={{ display: 'flex', p: 1 }}>
          <Avatar />
          {p.name}
        </Box>
      ))}
    </div>
  );
};

export default Deck;
