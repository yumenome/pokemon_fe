import React from 'react'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { Route, Routes } from 'react-router-dom'


const App = () => {


  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
    </Routes>
    </div>
  )
}

export default App