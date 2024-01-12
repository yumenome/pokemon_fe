import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Cards from '../components/Cards'
import { useStateContext } from '../ContextProvider'
import { Navigate } from 'react-router-dom'
import { useDisclosure } from '@chakra-ui/react'
import CardForm from '../components/CreateCardForm'
import axios from 'axios'
import CardList from '../components/cart/Cart'
import CartList from '../components/cart/Cart'
import Cart from '../components/cart/Cart'

const HomePage = () => {

  const { token } = useStateContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [types, setTypes] = useState([]);
  const [rarities, setRarities] = useState([]);

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

  if(!token) {
    return <Navigate to='/auth' />
  }

  return (
    <div>
        <Header onOpen={onOpen} />
        <Navbar types={types} rarities={rarities} />
        <CardForm  isOpen={isOpen} onClose={onClose} />
        <Cards />
        <Cart />
    </div>
  )
}

export default HomePage