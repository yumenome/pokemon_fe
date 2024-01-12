import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Switch, TagLabel, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import api_client from '../api/axios_client';
import axios from 'axios';
import Active from './Active';
import { useStateContext } from '../ContextProvider';

const EditCardForm = ({isOpen, onClose, card}) => {

    const nameRef = useRef();
    const priceRef = useRef();
    const totalRef = useRef();
    const [ active, setActive ] = useState(card.is_active);
    const [image, setImage] = useState('');
    const [type, setType] = useState('');
    const [rarity, setRarity] = useState('');
    const [types, setTypes] = useState([]);
    const [rarities, setRarities] = useState([]);
    const [newIMG, setNewIMG] = useState('');
    const { cards, setCards } = useStateContext();
   

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


    const toDelete = (card) =>{

      setCards(
        cards.filter(c => c.id !== card.id)
        )

        api_client.delete(`/cards/${card.id}`)
        .then(({data}) => {
            // console.log(data.message)
        });
    }

    const uploadImg = (e) =>{
        setImage(e.target.files[0]);
        // console.log(e.target.files[0].name);
        setNewIMG(e.target.files[0].name);
      }

    const toSubmit = (e) => {
        e.preventDefault();
        setNewIMG('');
  
        const data = new FormData();
        data.append('name', nameRef.current.value);
        data.append('price', priceRef.current.value);
        data.append('total', totalRef.current.value);
        data.append('is_active', active);
        if(!type){
          data.append('type', card.type);
        }else{
          data.append('type', type);
        }
        if(!rarity){
          data.append('rarity', card.rarity);
        }else{
          data.append('rarity', rarity);
        }

        data.append('img', image);
        data.append('_method', 'PATCH');


      api_client.post(`/cards/${card.id}`, data)
        .then(({data}) => {
          // console.log(data);
    window.location.reload(false)

        });



    // const updatedCard = cards.map((defaultCard) => 
    //  defaultCard.id === card.id ? 
    //  {...defaultCard,
    //   name: nameRef.current.value,
    //   per_price: priceRef.current.value,
    //   price: priceRef.current.value,
    //   selected: 1,
    //   total: priceRef.current.value,
    //   type: type,
    //   rarity: rarity,
    //   img: `card_images/${image.name}`,
    // }
    //  : defaultCard)

    //  setCards(updatedCard);

      }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'3xl'}>
    <ModalOverlay />
    <ModalContent p={3} borderRadius={9} >
        <ModalHeader>
            EDIT CARD INFOS ||
            <Button ml={2} size={{base: 'xs',md: 'sm'}} borderRadius={4}  bg={'black'} color={'white'} 
            _hover={{background: 'white', color: 'black', border: '1px solid #ccc'}} onClick={() => {toDelete(card)}} shadow={'md'}>
                DELETE --
            </Button>
        </ModalHeader>
        <ModalCloseButton />

      <ModalBody display={'flex'} flexDirection={{base: 'column', md: 'row'}} alignItems={'center'} justifyContent={'space-evenly'}  >
            <Box w={'300px'} position={'relative'}  >
            
            <Text position={'absolute'} bg={'white'} bottom={0} p={1} fontFamily={'monospace'} >CURRENT IMAGE</Text>
            <Image src={ 'http://localhost:8000/storage/' + card.img} alt='img' />

            </Box>

            <Box w={'300px'} border={'1px solid #ccc'} px={7} pt={5} pb={2} >
                <form onSubmit={toSubmit}  encType="multipart/form-data" >
                    {!newIMG ? 
                        (
                            <>
                                <Input type='file' onChange={uploadImg} className='upload' display={'none'} />
                                <Button size={'sm'} w={'full'} mb={3} onClick={() => document.querySelector('.upload').click()} bg={'black'} color={'white'} 
                                _hover={{background: 'white', color: 'black',border: '1px solid #ccc'}} shadow={'lg'}  > 
                                    NEW CARD?
                                </Button>
                            </>    
                        ) :
                        (
                            <Text fontSize={'sm'} p={2} mb={3} bg={'black'} textAlign={'center'} color={'white'} _hover={{background: 'white',color: 'black', border: '1px solid #ccc'}} borderRadius={4} >NEW CARD NAME: {newIMG}</Text>
                        )
                    }

                    <Input ref={nameRef} mb={3} defaultValue={card.name} placeholder='name' type='text' bg={'whiteAlpha.200'} />
                    <Input ref={priceRef} mb={3}  defaultValue={card.price} placeholder='price' type='number' bg={'whiteAlpha.200'}/> 
                    <Input ref={totalRef} mb={3}  defaultValue={card.total} placeholder='total' type='number' bg={'whiteAlpha.200'}/> 


                    <Select mb={5} defaultValue={card.type} placeholder='type_' onChange={(e) => {setType(e.target.value)}}>
                    {types.map((type) => (
                    <option key={type.id} value={type.id} >{type}</option>
                    ))}
                    </Select>

                    <Select mb={5} defaultValue={card.rarity} placeholder='rarity_'  onChange={(e) => {setRarity(e.target.value)}}>
                    {rarities.map((rarity) => (
                    <option key={rarity.id} value={rarity.id} >{rarity}</option>
                    ))}
                    </Select>

                    <Flex mt={3} alignItems={'center'} justifyContent={'space-between'}>
                        <Active card={card} active={active} setActive={setActive} />
                        <Button size={{md: 'sm',base: 'xs'}} w={'90px'} borderRadius={3} bg={'#fdce29'} color={'#333'}
                        _hover={{background: 'black', color: 'white'}} fontSize={'md'} type='submit' onClick={onClose} shadow={'md'} >
                                SAVE
                        </Button>
                    </Flex>
                
                </form>

            </Box>
      </ModalBody>
    </ModalContent>
  </Modal>
  )
}

export default EditCardForm