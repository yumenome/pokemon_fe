import { Box, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useStateContext } from '../ContextProvider'

const BySearching = () => {

  const { cards, setCards, filteredCards, setFilteredCards } = useStateContext();
  const [searchCard, setSearchCard] = useState([]);
  const [key, setKey] = useState('');

  console.log(key)
  const toSearch = (search) =>{
    console.log(search);
    // setSearchCard(search);

    if(searchCard !== ''){
      if(filteredCards.length > 0 && key !== 'Backspace'){
        const filteredData = filteredCards.filter((item) => {
          return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
        });

        console.log(filteredCards);
        setFilteredCards(filteredData);

      }else{
        const filteredData = cards.filter((item) => {
          return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
        });
        console.log(filteredData);
        setFilteredCards(filteredData);
      }
    }else{
      setFilteredCards([]);
    }
    
  }

  return (
    <Box px={5} borderRight={'1px solid #ccc'} >
          <Input placeholder='name...' variant='unstyled'  _placeholder={{ color: '#bcbbbb' }}
          onChange={(e) =>{toSearch(e.target.value)}} onKeyDown={(e) => setKey(e.key)}/>
        </Box>
  )
}

export default BySearching