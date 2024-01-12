import { Box, Button, Input, Select, border } from '@chakra-ui/react'
import React from 'react'
import ByType from '../filters/ByType'
import ByRarity from '../filters/ByRarity'
import { useStateContext } from '../ContextProvider'
import BySearching from '../filters/BySearching'


const Navbar = ({types, rarities}) => {

 const { filteredCards } = useStateContext();

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mt={30}>
      <Box w={'470px'} display={'flex'} alignItems={'center'} shadow={'lg'} h={10} borderRadius={60} py={6} outline={0} border={'1px solid #eee'} >
        <BySearching />
        <ByType types={types} />
        <ByRarity rarities={rarities} />
        
        {filteredCards.length > 0 && (
          <Button mr={3} p={3} fontWeight={400} bg={'none'} _hover={{bg: 'none',border: '1px solid #ccc'}} size={'xs'} 
          onClick={() =>{window.location.reload(false)}} >reset filters</Button>
        )}
        

      </Box>
    </Box>
  )
}

export default Navbar