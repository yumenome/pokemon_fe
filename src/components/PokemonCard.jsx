import { Box, Button, Card, Image, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import card_img from '../assets/images/card_img.png';
import CardForm from './CreateCardForm';
import EditCardForm from './EditCardForm';
import { useStateContext } from '../ContextProvider';

const PokemonCard = ({card}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { selectedCards, setSelectedCards,setTotalPrice, totalPrice, finalTotal, setFinalTotal, requiredAmount, requiredPrice, setCard } = useStateContext();
    const [isSelected, setIsSelected] = useState(false);
    // console.log(selectedCards);


    const toSelect = () =>{
        setSelectedCards([...selectedCards, card])
        setTotalPrice( totalPrice + card.price );
        setFinalTotal( finalTotal + 1)
        setIsSelected(true);
    }

    const toDeselect = () =>{
        setSelectedCards(
            selectedCards.filter(c => c.id !== card.id)
            )
            if(requiredAmount){
                setFinalTotal( finalTotal - requiredAmount)
            }else{
                setFinalTotal( finalTotal - 1)
            }
            if(requiredPrice){
                setTotalPrice( totalPrice - requiredPrice );
            }else{
                setTotalPrice( totalPrice - card.price );
            }
            setIsSelected(false);
    }


  return (
        <Card w={{base: '300px', md: '360px',lg: '380px'}} mb={'100px'} mt={{base: '300px',md: '380px'}} display={'flex'} alignItems={'center'} flexDirection={'column'} justifyContent={'center'} pt={5} pb={8} border={'1px solid #eee'} shadow={'lg'} borderRadius={20}>
            <Image src={ 'http://localhost:8000/storage/' + card.img} alt='img' w={'80%'} position={'absolute'} top={{base: -300,md: -380}} />

{/* details  */}
            <Box  display={'flex'}  alignItems={'center'} justifyContent={'center'} flexDirection={'column'} mt={{base: 3,md: 0,lg: 4}}>
                <Text fontSize={{base: '2xl',md: '3xl'}} fontWeight={600} > 
                    {card.name}
                </Text>
                <Text color={'#0f6db0'} fontSize={{base: 'xl', md: '2xl'}} fontWeight={400} >
                    {card.rarity}
                </Text>
                <Box display={'flex'} fontSize={{base: 'md',md: 'lg'}} w={'full'} alignItems={'center'} justifyContent={'space-around'} color={'#333'}>
                    <span>
                        ${card.price}
                    </span>
                    <span>
                        {card.total} left
                    </span>
                </Box>
            </Box>

            <Button position={'absolute'} right={0} borderRadius={0} size={{base: 'xs',md: 'sm'}}  bg={'black'} color={'white'} 
            _hover={{background: 'white', color: 'black'}} shadow={'lg'} onClick={onOpen}>edit</Button>

{/* select btn  */}
            {isSelected ? (
                <Button shadow={'lg'} w={'65%'} fontSize={'2xl'} bg={'#333'} color={'#fff'} py={7} px={5} borderRadius={50} position={'absolute'}  bottom={-7} _hover={{background: '#fdce29',color: '#333'}} 
                onClick={toDeselect} >
                    SELECTED
                </Button>
            ) :
            (
                <Button shadow={'lg'} w={'65%'} fontSize={'2xl'} bg={'#fdce29'} py={7} px={5} borderRadius={50} position={'absolute'}  bottom={-7} _hover={{background: '#333',color: '#fff'}} 
                onClick={toSelect} >
                    SELECT CARD
                </Button>
            )}
            <EditCardForm card={card} onClose={onClose} isOpen={isOpen} />
        </Card>
        
  )
}

export default PokemonCard