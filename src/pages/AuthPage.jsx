import React, { useRef, useState } from 'react'
import { useStateContext } from '../ContextProvider';
import { Navigate } from 'react-router-dom';
import { Box, Button, Flex, Image, Input } from '@chakra-ui/react';
import logo from '../assets/logo.png';
import api_client from '../api/axios_client';

const AuthPage = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState(null);

  const { token, user, setToken, setUser } = useStateContext();

  if(token) {
    return <Navigate to='/' />
  }

  const toSingup = () => {
    const inputs = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value
    }
    console.log(inputs);
    if(!inputs.email || !inputs.password || !inputs.password_confirmation || !inputs.name){
      alert('please fill all of the required fields');
      return;
    }
    api_client.post('/signup', inputs)
      .then(({data}) => {
        setUser(data.user);
        console.log(data);
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
            setErrors(response.data.errors);
        }
      })

  } 

  const toLogin = () => {
    const inputs = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    console.log(inputs);
    if(!inputs.email || !inputs.password){
      alert('please fill all of the required fields');
      return;
    }
    api_client.post('/login', inputs)
      .then(({data}) => {
        // debugger;
        setUser(data.user);
        console.log(user);
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            if(response.data.errors){
                console.log(response.data.errors);
                setErrors(response.data.errors);
            }else{
                console.log({password: [response.data.message]});
                setErrors({password: [response.data.message]});
            }
        }
    })
  }


  

  return (
    <Box display={'flex'}  alignItems={'center'} justifyContent={'center'} w={'full'} h={'100vh'}>
      
      <Box p={5} w={'450px'} border={'1px solid #eee'} shadow={'lg'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} >

        <Image src={logo} alt='logo' w={200} mb={2} />
        <form   >
          {!isLogin ? <Input ref={nameRef} mt={3} placeholder='name' type='text'/> : null}
          <Input ref={emailRef}  placeholder='email' mt={3} type='email' />
          <Input ref={passwordRef}  placeholder='password' mt={3} fontSize={14} type='password' />

          {!isLogin ? <Input ref={passwordConfirmRef}  placeholder="confirm password" mt={3} fontSize={14} type="password" /> : null}

          <Flex justifyContent={'center'}>
            {!isLogin ? 
            <Button w={'50%'} bg={'#fdce29'} _hover={{background: '#333',color: '#fff'}} size={'sm'} fontSize={14} mt={3} onClick={toSingup} > SIGNUP </Button> : 
            <Button w={'50%'} bg={'#fdce29'} _hover={{background: '#333',color: '#fff'}} size={'sm'} fontSize={14} mt={3} onClick={toLogin} > LOGIN </Button> 
            }
          </Flex>

        </form>

        <Flex alignItems={'center'} justifyContent={'center'} mt={3} >
          <Box mx={2} fontSize={14}>
            {isLogin ? "don't have an account?" : "already have an account?"}
          </Box>
          <Box onClick={() => setIsLogin(!isLogin)} color={'blue'} cursor={'pointer'}>
            {isLogin ? "signup" : "login"}
          </Box>
        </Flex>

      </Box>
    </Box>
  )
}

export default AuthPage