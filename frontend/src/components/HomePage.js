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
import { Modal } from '@consta/uikit/Modal'

import { InfoPage } from './InfoPage'


export const HomePage = () => {
    const [posts, setPosts] = useState([]) // переменная для хранения data по запросу /posts
    const [users, setUsers] = useState([])
    const [userItems, setUserItems] = useState([])
    const [userValue, setUserValue] = useState([])
    const [usersAndPosts, setUsersAndPosts] = useState([])
    const [comments, setComments] = useState([])
    const [postList, setPostList] = useState([])
    const [idP, setIdP] = useState([])

    const [isPostOpen, setIsPostOpen] = useState(false)
    const [isClick, setIsClick] = useState(true)

    const goToPosts = (event) => {
        event.preventDefault()
        window.location.assign('/postinfo/')
    }

    const clickOnPost = (event) => {
        console.log(event.target.id)
        setIdP(event.target.id)
        //window.location.assign('/infopage/' + id + '/')
        //setIsClick(true)
        setIsPostOpen(true)
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
            //setIsClick(false)
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
                <Modal className='post-modal' onClickOutside={() => setIsPostOpen(false)} isOpen={isPostOpen} onEsc={() => setIsPostOpen(false)} >
                    <InfoPage idP={idP} />
                </Modal>
                <Card className='main-card-position' verticalSpace="s" >
                {
                    (isClick === true) && (
                    <>

                            {postList.map((post, index) => (
                            <Grid col='12'>

                                    <Card className='post-preview-card-style' horizontalSpace='xl' >
                                        <Grid cols='12' className='user-avatar-grid' >
                                            <GridItem col='1'>
                                                <Avatar name={post.username}/>
                                            </GridItem>
                                            <GridItem col='9' className='name-style-on-main-card' >
                                                <Text as='div'>
                                                    <Text view='linkMinor' as='span' size='m' >
                                                        {post.username}&nbsp;
                                                    </Text>
                                                    <Text view='ghost' as='span' size='xs' >
                                                        {post.email}
                                                    </Text>
                                                </Text>
                                            </GridItem>

                                        </Grid>
                                        <Grid cols='12'>
                                            <GridItem col='12' className='main-page-post-title'>
                                                <Text as='div' view='linkMinor' >
                                                    Theme:&nbsp;
                                                    <Text view='link' as='span' cursor='pointer' id={post.id} onClick={(event) => clickOnPost(event)}>
                                                        {post.title}
                                                    </Text>
                                                </Text>
                                            </GridItem>
                                        </Grid>
                                        <Grid cols='12' className='truncate-text-grid-style' >
                                            <GridItem col='6'>
                                                <Text truncate view='primary'>
                                                    {post.body}
                                                </Text>
                                            </GridItem>
                                        </Grid>
                                    </Card>
                            </Grid>
                            ))}
                            </>
                    )
                }


                </Card>
            </Grid>
        </div>
    )

}