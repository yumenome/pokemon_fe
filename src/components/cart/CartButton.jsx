import { Badge, Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { BsFillCartFill } from 'react-icons/bs'
import { useStateContext } from '../../ContextProvider'

const CartButton = ({onOpen}) => {

  const { finalTotal } = useStateContext();

  return (
    <Box position={'fixed'} w={'full'} bottom={5} display={'flex'} justifyContent={'center'} >
    <Button py={5} px={'20px'}  size={'md'} borderRadius={11} bg={'#298bfd'} color={'#fff'} _hover={{background: 'blue', color: 'white'}} fontWeight={600} onClick={onOpen}  >
    {finalTotal > 0 && (
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} bg={'red'} position={'absolute'} top={-2} left={-2}  borderRadius={'50%'} fontSize={'18px'} w={'26px'} h={'24px'} >
        {finalTotal}
      </Box>
    )}
      <BsFillCartFill style={{fontSize: '18px'}} />
      <Text ml={1} fontSize={'16px'} >CART LIST</Text>
    </Button>
  </Box>
  )
}

export default CartButton