import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Switch, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import api_client from '../api/axios_client';
import axios from 'axios';
import Active from './Active';
import { useStateContext } from '../ContextProvider';

const CardForm = ({isOpen, onClose}) => {

    const nameRef = useRef();
    const priceRef = useRef();
    const totalRef = useRef();
    const [image, setImage] = useState('');
    const [type, setType] = useState('');
    const [rarity, setRarity] = useState([]);
    const [types, setTypes] = useState([]);
    const [rarities, setRarities] = useState([]);

    const { setCards, cards } = useStateContext();

    useEffect(() => {
        axios.get(' https://api.pokemontcg.io/v2/types')
          .then(({data}) =>{
            setTypes(data.data);        
          })
        axios.get('https://api.pokemontcg.io/v2/rarities')
          .then(({data}) =>{
            setRarities(data.data);
          })
      },[])



    const uploadImg = (e) =>{
        // console.log(e.target.files[0])
        setImage(e.target.files[0]);
      }

    const toSubmit = (e) => {
        e.preventDefault();

  
        if(!nameRef.current.value || !priceRef.current.value || !totalRef.current.value || !type || !rarity || !image){
          alert('please fill all of the required fields');
        }else{
          const data = new FormData();
          data.append('name', nameRef.current.value);
          data.append('price', priceRef.current.value);
          data.append('total', totalRef.current.value);
          // data.append('selected', 1);
          data.append('type', type);
          data.append('rarity', rarity);
          data.append('img', image);
  
    
        api_client.post('cards', data)
        .then(({data}) => {
          // console.log(data.image);
          // window.location.reload(false);
        })
  
        setCards([...cards,
          {name: nameRef.current.value,
          per_price: priceRef.current.value,
          price: priceRef.current.value,
          // selected: 1,
          total: priceRef.current.value,
          type: type,
          rarity: rarity,
          img: `card_images/${image.name}`,
          }
        ])
        }


      }


  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent p={3} borderRadius={9} >
      <ModalHeader>CAREATE NEW CARD</ModalHeader>
      <ModalCloseButton />
      <ModalBody display={'flex'} flexDirection={'column'}  >
            <form onSubmit={toSubmit}  encType="multipart/form-data" >
              {!image ?
                <>
                  <Input type='file' onChange={uploadImg} className='upload' display={'none'} />
                  <Button size={'sm'} w={'full'} mb={3} onClick={() => document.querySelector('.upload').click()} bg={'black'} color={'white'} 
                  _hover={{background: 'white', color: 'black',border: '1px solid #ccc'}} shadow={'lg'}  > 
                      CARD IMAGE
                  </Button>
                </>
                :
                <Text fontSize={'sm'} p={2} mb={3} bg={'black'} textAlign={'center'} color={'white'} _hover={{background: 'white',color: 'black', border: '1px solid #ccc'}} borderRadius={4} >CARD IMAGE NAME: {image.name}</Text>
              }
                

                <Input ref={nameRef} mb={3} placeholder='name' type='text' bg={'whiteAlpha.200'} />
                <Input ref={priceRef} mb={3}  placeholder='price' type='number' bg={'whiteAlpha.200'}/> 
                <Input ref={totalRef} mb={3}  placeholder='total' type='number' bg={'whiteAlpha.200'}/> 


                <Select mb={5} placeholder='type' value={type} onChange={(e) => {setType(e.target.value)}}>
                {types.map((type) => (
                <option key={type.id} value={type.id} >{type}</option>
                ))}
                </Select>
                <Select mb={5} placeholder='rarity' value={rarity} onChange={(e) => {setRarity(e.target.value)}}>
                  {rarities.map((rarity) => (
                  <option key={rarity.id} value={rarity.id} >{rarity}</option>
                  ))}
                </Select>

                <Flex mt={3} alignItems={'center'} justifyContent={'space-between'}>
                    <Button size={{md: 'sm',base: 'xs'}} w={'90px'} borderRadius={3} bg={'#fdce29'} color={'#333'}
                    _hover={{background: 'black', color: 'white'}} fontSize={'md'} type='submit' onClick={onClose} >
                            CREATE
                    </Button>
                </Flex>
               
            </form>
      </ModalBody>
    </ModalContent>
  </Modal>
  )
}

export default CardForm