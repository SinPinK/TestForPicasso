import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'

import './Components.css' // импорт css-разметки

import { Grid, GridItem } from '@consta/uikit/Grid'
import { Text } from '@consta/uikit/Text'
import { Card } from '@consta/uikit/Card'
import { Select } from '@consta/uikit/Select'
import { Button } from '@consta/uikit/Button'
import { Avatar } from '@consta/uikit/Avatar'


export const HomePage = () => {
    const [posts, setPosts] = useState([]) // переменная для хранения data по запросу /posts
    const [users, setUsers] = useState([])
    const [userItems, setUserItems] = useState([])
    const [userValue, setUserValue] = useState([])
    const [usersAndPosts, setUsersAndPosts] = useState([])
    const [comments, setComments] = useState([])
    const [postList, setPostList] = useState([])
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
            //console.log(JSON.parse(response.data))
            //setContent(JSON.parse(response.data))
            setPosts(JSON.parse(response.data)['posts'])
            setUsers(JSON.parse(response.data)['users'])
            setComments(JSON.parse(response.data)['comments'])
            setUserItems(JSON.parse(response.data)['user_items'])
            setUsersAndPosts(JSON.parse(response.data)['users_with_posts'])
            setPostList(JSON.parse(response.data)['posts'])
            //console.log(JSON.parse(response.data)['users_with_posts'])
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

    const onChangeSelectUser = (event) => {
        setUserValue(event.value)
        console.log(event.value['id'])
        let id = Number(event.value['id'])
        if (id === 0) {
            setPostList(posts)
        } else {
            setPostList(usersAndPosts[id]['posts'])
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
                                <Select caption='Выберите пользователя' items={userItems} value={userValue} onChange={(event) => onChangeSelectUser(event)}/>
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
                            {postList.map((post, index) => (
                                <Grid col='12'>
                                    <Card className='post-preview-card-style' horizontalSpace='xl' >
                                        <Grid cols='12'>
                                            <GridItem col='1'>
                                                <Avatar name={post.username}/>
                                            </GridItem>
                                            <GridItem col='5'>
                                                <Text view='linkMinor' >
                                                    {post.username}
                                                </Text>
                                            </GridItem>
                                        </Grid>
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