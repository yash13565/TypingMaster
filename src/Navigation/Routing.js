import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Screens/Home/Home'
import TypingTest from '../Screens/TypingTest/TypingTest'

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/typingtest' element={<TypingTest />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing