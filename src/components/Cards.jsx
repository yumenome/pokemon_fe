import { Box, Button, Container, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'
import api_client from '../api/axios_client';
import { useStateContext } from '../ContextProvider';
import noitem from '../assets/404-error.png';


const Cards = () => {

  const { cards, setCards, nothing, filteredCards } = useStateContext();

  useEffect(() => {
    api_client.get(`/cards`)
    .then(({data}) => {
      // console.log(data.data);
      setCards(data.data);
    });
  },[])


  return (
    <>
      {nothing ? (
          <Flex alignItems={'center'} justifyContent={'center'} mt={'50px'} direction={'column'} >
            <Image src={noitem} w={'400px'} />
            <Text textAlign={'center'}  fontFamily={'fantasy'} fontSize={'4xl'}>
              SORRY WE DON'T HAVE THAT!
            </Text>
            <Button shadow={'xl'} size={'md'} borderRadius={0} bg={'#fdce29'} _hover={{background: '#333',color: '#fff'}} onClick={() =>{window.location.reload(false)}} >back to all</Button>
          </Flex>
        ) :
        (
          <Box mt={10} display={'flex'} alignItems={'center'} justifyContent={'space-evenly'} maxW={'full'} mx={{ md: 0, lg: 20 }} flexWrap={'wrap'}>
            {filteredCards.length > 0 ? (
              <>
                {filteredCards.map((card) => (
                <PokemonCard card={card} key={card.id} />
                ))}
              </>
            ) :
            (
              <>
                {cards.map((card) => (
                <PokemonCard card={card} key={card.id} />
              ))}
              </>
            )
            }
        </Box>
        )
      }
    </>
  )
}

export default Cards