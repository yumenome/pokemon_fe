import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import logo  from '../assets/logo.png'
import { useStateContext } from '../ContextProvider'
import api_client from '../api/axios_client'

const Header = ({onOpen}) => {

  const { user, setUser, setToken } = useStateContext();


  useEffect(() => {
    api_client.get('/user/')
    .then(({data}) => {
      // console.log(data);
      setUser(data);
    })
  },[])

  const Logout = () => {
    api_client.post(`/logout`)
      .then(({data}) => {
        // console.log(data);
        setToken(null);
        setUser({});
      });
  };

  return (
    <Box shadow={'md'} >

{/* card ++  */}
      <Button mt={1} ml={2} size={{md: 'sm',base: 'xs'}} borderRadius={0} bg={'#fdce29'} color={'#333'} _hover={{background: 'black', color: 'white'}} fontSize={'md'} fontWeight={600} onClick={onOpen} >
        CARD ++
      </Button>

{/* logo  */}
      <Box position={'relative'} display={'flex'}  justifyContent={'center'}  >
          <Image src={logo} alt="logo" w={180} position={'absolute'} top={'-38px'}/>
      </Box>

{/* user  */}

      <Box position={'relative'} pb={1} >
        <Flex position={'absolute'} right={2} top={{md: '-33px',base: '-24px'}}>
          <Text  color={'red'} fontWeight={600} fontSize={'20px'} display={{md: 'block',base: 'none'}} >
              hello!_<span style={{fontWeight: 400, color: 'black', fontSize: '18px'}}>{user.name}</span>
          </Text>

          <Button mb={1} ml={2} size={{md: 'sm',base: 'xs'}} borderRadius={5} bg={'black'} color={'white'} 
            _hover={{background: 'white', color: 'black', border: '1px solid #ccc'}} fontSize={'md'} fontWeight={600} onClick={Logout} >
              logout
          </Button>

        </Flex>
        
      </Box>

    </Box>

  )
}

export default Header