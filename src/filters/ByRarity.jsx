import { Box, Select } from '@chakra-ui/react'
import React from 'react'
import { useStateContext } from '../ContextProvider';

const ByRarity = ({rarities}) => {

    const { cards, setNothing, setFilteredCards, filteredCards } = useStateContext();

    const toRarity = (selectedRarity) =>{
        console.log(selectedRarity);
        if(selectedRarity){
                if(filteredCards.length > 0){
                    const filtered = filteredCards.filter(card => 
                    card.rarity.includes(selectedRarity));
                    if(filtered.length > 0){
                    // console.log(filtered);
                    setFilteredCards(filtered);
                    setNothing(false); 
                    return ;
                    }
                    else{
                        setNothing(true);
                        return;
                    }
                }
                else{
                    const filtered = cards.filter(card => 
                    card.rarity.includes(selectedRarity));
                    if(filtered.length > 0){
                    console.log(filtered);
                    setFilteredCards(filtered);
                    setNothing(false); 
                    return ;
                    }
                    else{
                        setNothing(true);
                        return;
                    }
                }         
        }
        else{
            setNothing(false);
            setFilteredCards([]);
        }
    }

  return (
    <Box mx={1} >
          <Select placeholder='rarites' variant='unstyled' color={'#bcbbbb'} onChange={(e) => {toRarity(e.target.value)}} >
          {rarities.map((rarity) => (
              <option value={rarity}>{rarity}</option>
            ))}
          </Select>
        </Box>
  )
}

export default ByRarity