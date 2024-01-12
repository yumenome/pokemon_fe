import { Box, Select } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useStateContext } from '../ContextProvider'

const ByType = ({types}) => {

    const { cards, setNothing, setFilteredCards, filteredCards } = useStateContext();

    const toType = (selectedType) =>{
        console.log(selectedType);
        if(selectedType){
            if(filteredCards.length > 0){
                const filtered = filteredCards.filter(card => 
                card.type.includes(selectedType));
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
            else{
                const filtered = cards.filter(card => 
                card.type.includes(selectedType));
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
        }else{
            setNothing(false);
            setFilteredCards([]);
        }
    }

  return (
    <Box  mx={2} borderRight={'1px solid #ccc'} >
        <Select placeholder='types' variant='unstyled'  color={'#bcbbbb'} onChange={(e) =>{toType(e.target.value)}} >
        {types.map((type) => (
            <option value={type}>{type}</option>
        ))}
        </Select>
    </Box>
  )
}

export default ByType