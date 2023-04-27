import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'

import './Components.css' // импорт css-разметки

import { Grid, GridItem } from '@consta/uikit/Grid'
import { Text } from '@consta/uikit/Text'
import { Card } from '@consta/uikit/Card'
import { Select } from '@consta/uikit/Select'
import { Button } from '@consta/uikit/Button'


export const HomePage = () => {
    const [posts, setPosts] = useState([]) // переменная для хранения data по запросу /posts
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])
    const [isClick, setIsClick] = useState(true)

    const goToPosts = (event) => {
        event.preventDefault()
        window.location.assign('/postinfo/')
    }

    const clickOnPost = (event) => {
        console.log(event.target.id)
        let id = event.target.id
        window.location.assign('/infopage/' + id + '/')
        setIsClick(true)
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: window.location.origin+'/api/postsview/',
        }).then(response => {
            console.log(JSON.parse(response.data))
            //setContent(JSON.parse(response.data))
            setPosts(JSON.parse(response.data)['posts'])
            setUsers(JSON.parse(response.data)['users'])
            setComments(JSON.parse(response.data)['comments'])
            //doPosts(JSON.parse(response.data))
        }).catch(error => {
            console.log(error)
            //setPostsValueError('Quasi per errorem inciderunt')
        })
    }, [])

    const postPosts = (event) => {
        if (isClick === true) {
            setIsClick(false)
        } else {
            setIsClick(true)
        }
    }

    return (
        <div>
            <Grid cols='12'>
                <GridItem col='12'>
                    <Card>
                        <Grid cols='12'>
                            <GridItem col='1' />
                            <GridItem col='3'>
                                <Text> Здесь будет select </Text>
                            </GridItem>
                            <GridItem col='3'>
                                <Button label='Отобразить посты' onClick={(event) => postPosts(event)} />
                            </GridItem>
                        </Grid>
                    </Card>
                </GridItem>
            </Grid>
            <Grid cols='12'>
                {
                    (isClick === false) && (
                        <div>
                            {posts.map((post, index) => (
                                <Grid col='12'>
                                    <Card className='post-preview-card-style' horizontalSpace='xl' >
                                        <Grid cols='12'>
                                            <GridItem col='12'>
                                            <Text view='link' cursor='pointer' id={post.id} onClick={(event) => clickOnPost(event)}>
                                                {post.title}
                                            </Text>
                                            </GridItem>
                                        </Grid>
                                    </Card>
                                </Grid>
                            ))}
                        </div>
                    )
                }

            </Grid>
        </div>
    )

}