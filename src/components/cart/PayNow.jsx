import { Button, Flex, Image, ModalContent, Text } from '@chakra-ui/react'
import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import thankq from '../../assets/tq.png'

const PayNow = ({onClose}) => {

    const toEnd = () =>{
        window.location.reload(false)
        document.getElementById('end').click();
    }
  return (
    <ModalContent w={'500px'} borderRadius={9} >
        <Flex direction={'column'} alignItems={'center'} justifyContent={'center'} h={'500px'}  >
            <Image mt={5} src={thankq} w={'300px'} />
        <Text fontSize={20} my={5} fontWeight={600} fontFamily={'inherit'}>
            PAYMENT SUCCESS!
        </Text>
        <Button p={5} position={'absolute'} id='end' bottom={-4} bg={'red'} fontSize={'2xl'} size={'sm'} color={'#fff'} _hover={{background: '#fff',color: 'red',border: '1px solid #ccc'}} onClick={toEnd} >
              <IoCloseSharp />
        </Button>
        </Flex>
    </ModalContent>
  )
}

export default PayNow