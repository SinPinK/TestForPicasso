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


function App() {
    const [content, setContent] = useState([])
    const [posts, setPosts] = useState([])

    const [valueError, setValueError] = useState('')

    /*const doPosts = (content) => {
        //event.preventDefault()
        setPosts(content.posts)
        console.log('posts: ', posts)
    }*/

    useEffect(() => {
        axios({
            method: 'GET',
            url: window.location.origin+'/api/postsview/',
        }).then(response => {
            console.log(JSON.parse(response.data))
            //setContent(JSON.parse(response.data))
            setPosts(JSON.parse(response.data)['posts'])
            //doPosts(JSON.parse(response.data))
        }).catch(error => {
            console.log(error)
            setValueError('Quasi per errorem inciderunt')
        })
    }, [])

    return (
        <Theme preset={presetGpnDefault}>
            <div className="show-container" >
            <BrowserRouter>
                <Container>
                    <Header>
                        <CustomNavbar/>
                    </Header>
                    <Content className='main-container' >
                        <div>
                            <Routes>
                                <Route path='/postinfo/' element={<PostsPage/>}/>
                                <Route path='/infopage/' element={<InfoPage/>}/>
                            </Routes>
                        </div>
                        {/*posts.map((post, index) => (
                            <Card className='post-card'shadow={true} horizontalSpace='xl' >
                                <Grid cols='12'>
                                    <Text >
                                        {post.title}
                                    </Text>
                                </Grid>
                            </Card>
                        ))*/}
                    </Content>

                </Container>
            </BrowserRouter>
            </div>
        </Theme>
    )
}

export default App;
