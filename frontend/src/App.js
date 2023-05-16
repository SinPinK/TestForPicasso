import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { CustomNavbar } from './mainComponents/CustomNavbar'
import { CustomFooter } from './mainComponents/CustomFooter'
import { Container, Header, Content, Footer, Sidebar } from 'rsuite'

import { Theme, presetGpnDefault } from '@consta/uikit/Theme'
import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'

import { PostsPage } from './components/PostsPage'
import { InfoPage } from './components/InfoPage'
import { HomePage } from './components/HomePage'


function App() {
    const [content, setContent] = useState([])
    const [posts, setPosts] = useState([])

    const [valueError, setValueError] = useState('')

    return (
        <Theme preset={presetGpnDefault}>
            <div className="show-container" >
            <BrowserRouter>
                <Container>
                    <Header>
                        <CustomNavbar/>
                    </Header>
                    <Content className='page-size' >

                        <HomePage className='home-page' />
                        <div>
                            <Routes>
                                <Route path='/postinfo/' element={<PostsPage/>}/>
                                <Route path='/infopage/:id/' element={<InfoPage/>}/>
                            </Routes>
                        </div>

                    </Content>
                    <CustomFooter />
                </Container>
            </BrowserRouter>
            </div>
        </Theme>
    )
}

export default App;
