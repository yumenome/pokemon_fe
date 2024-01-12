import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons'
import { useStateContext } from '../../ContextProvider';

const CartItem = ({card, toIncrease, toDecrease}) => {


  return (

    <Flex justifyContent={'space-between'} mb={5} alignItems={'center'} >
        <Flex alignItems={'center'}>
            <Image src={ 'http://localhost:8000/storage/' + card.img} w={'140px'} />
            <Flex direction={'column'} ml={5}>
                <Text fontSize={'20px'} fontWeight={700}>{card.name}</Text>
                <Text mb={'60px'} fontSize={'17px'} fontWeight={400}>$<span style={{color: 'red',fontWeight: 700}} >{card.per_price}</span> per card </Text>
                <Text fontSize={'15px'} ><span style={{color: 'red',fontWeight: 600}} >{card.total}</span> cards left</Text>
            </Flex>
        </Flex>
        <Flex direction={'column'}>
            <Flex mb={'50px'} alignItems={'center'} mt={7} >
                <Text fontSize={'xl'} fontWeight={600} color={'blue'} mr={1} >{card.selected}</Text>
                <Flex direction={'column'} alignItems={'center'}> 
                    {card.total > 0  ? 
                    <ChevronUpIcon color={'blue'} boxSize={6} _hover={{cursor: 'pointer'}} onClick={() => {toIncrease(card)}} /> 
                    : 
                    <CloseIcon color={'red'} boxSize={3} mb={1} />
                    }

                    {card.selected > 0 ? 
                    <ChevronDownIcon color={'blue'} boxSize={6} _hover={{cursor: 'pointer'}} onClick={() => {toDecrease(card)}} />
                    :
                    <CloseIcon color={'red'} boxSize={3} mt={1} /> 
                    } 
                </Flex>
            </Flex>
            <Text fontSize={'18px'} fontWeight={600}> price</Text>
            <Text fontSize={'lg'} fontWeight={600} color={'blue'} mr={1} >${card.price}</Text>
        </Flex>
    </Flex>
  )
}

export default CartItem