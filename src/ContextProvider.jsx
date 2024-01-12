import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext ({
    user: {},
    cards: {},
    token: '',
    nothing: '',
    filteredCards: [],
    selectedCards: [],
    totalPrice: 0,
    active: false,
    finalTotal: 0,
    requiredAmount: 0,
    requiredPrice: 0,
    cardAmount: 0,
    setCardAmount: () => {},
    setRequiredPrice: () => {},
    setRequiredAmount: () => {},
    setActive: () => {}, 
    setFinalTotal: () => {},
    setTotalPrice: () => {},
    setSelectedCards: () => {},
    setFilteredCards: () => {},
    setNothing: () => {},
    setCards: () => {},
    setUser: () => {},
    setToken: () => {},
}) 

export const ContextProvider = ({children}) => {

    const[token, _setToken] = useState(localStorage.getItem('API_TOKEN'));
    const[user, setUser] = useState({});
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [nothing, setNothing] = useState(false); 
    const [totalPrice, setTotalPrice] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);
    const [requiredAmount, setRequiredAmount] = useState(0);
    const [requiredPrice, setRequiredPrice] = useState(0);
    const [cardAmount, setCardAmount] = useState(1);

    const setToken = (token) => {
        _setToken(token);
        if(token){
            localStorage.setItem('API_TOKEN', token);
        }else{
            localStorage.removeItem('API_TOKEN');
        }
    }

  return (
    <StateContext.Provider value={{ user, token, setUser, setToken, cards, setCards, nothing, setNothing, filteredCards, setFilteredCards, selectedCards, setSelectedCards, setTotalPrice, totalPrice, finalTotal, setFinalTotal, setRequiredAmount, requiredAmount, requiredPrice, setRequiredPrice, setCardAmount, cardAmount }} >
        {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
