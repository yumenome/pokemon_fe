import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import api_client from '../api/axios_client';

const Active = ({card, active, setActive}) => {


  const toActive = () => {
    setActive(1);
    api_client.post(`/active/${card.id}`)
    .then(({data}) => {
      // console.log(data);
    })
  }
  
  const toDeactive = () => {
    setActive(0);
    api_client.post(`/active/${card.id}`)
    .then(({data}) => {
      // console.log(data);
    })
  }
  return (
    <Flex alignItems={'center'} >
        {(active === 1) ? (
            <Text py={1} size={{md: 'sm',base: 'xs'}} w={'90px'} borderRadius={3} bg={'blue'} color={'white'}
            _hover={{background: 'white',border:'1px solid #ccc',color:'black', cursor: 'pointer'}} fontSize={'md'} type='submit' onClick={toDeactive} shadow={'md'} textAlign={'center'} >
                    ACTIVE
            </Text>
        ) :
        (
            <Text py={1} size={{md: 'sm',base: 'xs'}} w={'90px'} borderRadius={3} bg={'red'} color={'white'}
            _hover={{background: 'white',border:'1px solid #ccc',color:'black', cursor: 'pointer'}} fontSize={'md'} type='submit' onClick={toActive} shadow={'md'} textAlign={'center'} >
                INACTIVE
            </Text>
        )}
    </Flex>
  )
}

export default Active