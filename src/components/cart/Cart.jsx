import { Badge, Box, Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsFillCartFill } from "react-icons/bs";
import CartButton from './CartButton';
import CartList from './CartList';
import { Link } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import { useStateContext } from '../../ContextProvider';
import PayNow from './PayNow';
import noselected from '../../assets/no.png'

const Cart = () => {

  const { selectedCards, totalPrice, finalTotal, cardAmount } = useStateContext();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = useState('inside')
  const [show, setShow] = useState(false);

  return (
    <Box  > 
      <CartButton onOpen={onOpen}  />
      <Modal size={'lg'}  isCentered
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        {!show ? 
          <ModalContent>
          <ModalBody>
            <CartList />
          </ModalBody>
          <ModalFooter>
           {finalTotal > 0 ? (
            <Flex w={'full'} direction={'column'} alignItems={'center'} >
            <Text mb={4} textDecoration={'underline'} fontWeight={200} fontSize={'lg'} _hover={{cursor: 'pointer'}} onClick={() =>{window.location.reload(false)}} >clear all</Text>
            <Flex w={'250px'} alignItems={'center'} justifyContent={'space-between'} mb={2} fontSize={'xl'} >
              <Text fontWeight={700} >TOTAL CARDS</Text>
              <Text fontWeight={700} color={'red'} >{finalTotal}</Text>
            </Flex>
            <Flex  w={'250px'} alignItems={'center'} justifyContent={'space-between'} mb={2} fontSize={'2xl'} >
              <Text fontWeight={700} >TOTAL PRICE</Text>
              <Text fontWeight={700} color={'red'} >${totalPrice}</Text>
            </Flex>
              <Button mt={5} mb={3} onClick={() => {setShow(true)}} w={'200px'}  py={5} px={'20px'}  size={'lg'} borderRadius={50} bg={'#298bfd'} color={'#fff'} _hover={{background: 'blue', color: 'white'}} fontWeight={600}>pay now</Button>

              <Button p={0} position={'absolute'}  bottom={-4} bg={'red'} fontSize={'2xl'} size={'sm'} color={'#fff'} _hover={{background: '#fff',color: 'red',border: '1px solid #ccc'}} onClick={onClose} >
              <IoCloseSharp />
              </Button>
            </Flex>
           ) :
           (
            <Flex w={'full'} direction={'column'} justifyContent={'center'} alignItems={'center'} h={'250px'} >
              <Image src={noselected} w={'200px'} />
               <Text textAlign={'center'} mb={20} mt={3} fontWeight={600} fontFamily={'sans-serif'} fontSize={'28px'} fontStyle={700} color={'#ff9c9b'}>
                 NO CARDS YET!
              </Text>
              <Button p={0} position={'absolute'}  bottom={-4} bg={'red'} fontSize={'2xl'} size={'sm'} color={'#fff'} _hover={{background: '#fff',color: 'red',border: '1px solid #ccc'}} onClick={onClose} >
              <IoCloseSharp />
              </Button>
            </Flex>
           )
          
          }
          </ModalFooter>
          </ModalContent>
          :
          <PayNow onClose={onClose}/>
        }
      </Modal>
    </Box>  
  )
}

export default Cart