import React, { useState } from 'react'
import { useStateContext } from '../../ContextProvider'
import CartItem from './CartItem';
import { Box } from '@chakra-ui/react';
import PokemonCard from '../PokemonCard';

const CartList = () => {

    const { selectedCards, setSelectedCards, setFinalTotal, finalTotal, setTotalPrice, totalPrice, setRequiredPrice, setRequiredAmount } = useStateContext();


    const toIncrease = (item) =>{
     setRequiredAmount(item.selected +1);
     setRequiredPrice(item.price + item.per_price )
     setFinalTotal( finalTotal + 1)
     setTotalPrice( totalPrice + item.per_price );
     const IncreasedCard = selectedCards.map((card) => 
     card.id === item.id ? {...card, total: --item.total,price: item.price + item.per_price,selected: item.selected +1} : card)

    //  console.log(IncreasedCard);
     setSelectedCards(IncreasedCard);
   }
   
   const toDecrease = (item) =>{
    setRequiredAmount(item.selected -1)
    setRequiredPrice(item.price - item.per_price )
    setFinalTotal( finalTotal - 1)
    setTotalPrice( totalPrice - item.per_price );
    const IncreasedCard = selectedCards.map((card) => 
    card.id === item.id ? {...card, 
      total: ++item.total,
      price: item.price - item.per_price,
      selected: item.selected -1} 
    : card)

    // console.log(IncreasedCard);
    setSelectedCards(IncreasedCard);
  }


  return (
    <Box py={7} px={3}>
        {selectedCards.map((card) => (
            <CartItem card={card} key={card.id}  toIncrease={toIncrease} toDecrease={toDecrease}/>
        ))}
    </Box>
  )
}

export default CartList