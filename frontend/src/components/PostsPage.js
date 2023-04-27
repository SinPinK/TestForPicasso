/*
страница с отображением карточек с превью постов
*/
import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'

import './Components.css' // импорт css-разметки

// Элементы ui-библиотеки @consta uikit (система принадлежит ГПН, имеется в открытом доступе)
import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'

export const PostsPage = () => {
    const [value, setValue] = useState([])
    const [posts, setPosts] = useState([]) // переменная для хранения data по запросу /posts

    const [postsValueError, setPostsValueError] = useState('') // Переменная для хранения информации об ошибке при запросе data

    // для автоматического сбора data при открытии страницы
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
            setPostsValueError('Quasi per errorem inciderunt')
        })
    }, [])

    return (
        <Fragment>
            {posts.map((post, index) => (
                <Grid col='12'>
                    <Card className='post-preview-card-style' horizontalSpace='xl' >
                        <Grid cols='12'>
                            <GridItem col='12'>
                            <Text>
                                {post.title}
                            </Text>
                            </GridItem>
                        </Grid>
                    </Card>
                </Grid>
            ))}
            <Grid cols='12'>
                <Card className='non-shadow-card' shadow={false}/>
            </Grid>
        </Fragment>
    )
}