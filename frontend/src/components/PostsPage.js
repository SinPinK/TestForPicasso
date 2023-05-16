/*
страница для отображения подробной информации о посте:
 - тайтл поста
 - тело поста
 - инфо о пользователе
 - комментарии
*/
import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { IconBackward } from '@consta/icons/IconBackward'
import { IconCommentStroked } from '@consta/icons/IconCommentStroked'
import { Avatar } from '@consta/uikit/Avatar'

export const PostsPage = (props) => {
    const [values, setValues] = useState([])
    const [post, setPost] = useState([])
    const [user, setUser] = useState([])
    const [comments, setComments] = useState([])
    const [commentsCount, setCommentsCount] = useState([])

    //let id = document.location.pathname
    let id = props.id

    const [isCommentsShow, setIsCommentsShow] = useState(false)

    const clickBack = (event) => {
        event.preventDefault()
        //console.log(document.location.pathname)
        window.location.assign('/')
    }

    const clickComments = (event) => {
        event.preventDefault()
        if (isCommentsShow === false) {
            setIsCommentsShow(true)
        } else {
            setIsCommentsShow(false)
        }
    }

    const testButton = (event) => {
        //console.log(document.location.pathname)
    }

    useEffect(() => {
        axios({
            method: 'POST',
            url: window.location.origin+'/api/postsview/',
            data: id,
        }).then(response => {
            //setValues(JSON.parse(response.data))
            setPost(JSON.parse(response.data)['post'])
            setUser(JSON.parse(response.data)['author'])
            setComments(JSON.parse(response.data)['comments'])
            setCommentsCount(JSON.parse(response.data)['comments_count'])
            //console.log(JSON.parse(response.data)['comments_count'])
        }).catch(error => {
            console.log('error: ', error)
        })
    }, [])



    return (
        <div>
            <Grid cols='12'>
                <GridItem className='main-card-position' col='12'>
                {/*<Card className='info-card-size' >
                */}
                <Card className='post-preview-card-style' >
                    <Grid cols='12'>
                        <GridItem col='2'>
                            <Button view='clear' onlyIcon iconLeft={IconBackward} onClick={(event) => clickBack(event)} />
                        </GridItem>
                    </Grid>
                    <Grid cols='12'>
                        <GridItem className='user-avatar-grid-info' col='1'>
                            <Avatar name={user.name}/>
                        </GridItem>
                        <GridItem className='user-name-near-avatar' col='5'>
                            <Text view='linkMinor' >
                                {user.name}
                            </Text>
                        </GridItem>
                    </Grid>
                    <Grid cols='12'>
                        <GridItem className='post-title-grid' col='12'>
                            <Text view='linkMinor'>
                                Theme: {post.title}
                            </Text>
                        </GridItem>
                    </Grid>
                    <Grid cols='12'>
                        <GridItem className='post-body-grid' col='12'>
                            <Text view='primary'>
                                {post.body}
                            </Text>
                        </GridItem>
                    </Grid>
                    <Grid cols='12'>
                        <GridItem col='2'>
                            <Button view='clear' label={commentsCount} iconLeft={IconCommentStroked} onClick={(event) => clickComments(event)} />
                        </GridItem>
                    </Grid>
                </Card>
                </GridItem>
            </Grid>
            <Grid cols='12'>
                <Card className='info-card-size' shadow={false} >

                    {
                        (isCommentsShow === true) && (
                        <>
                    {comments.map((comment, index) => (
                        <Grid cols='12'>
                            <Card className='comment-card-style'>
                                <Grid col='12'>
                                    <GridItem col='1' className='comment-author-avatar' >
                                        <Avatar size='s' name={comment.email} />
                                    </GridItem>
                                    <GridItem col='4' className='comment-author-mail' >
                                        <Text size='xs' view='link'>
                                            {comment.email}
                                        </Text>
                                    </GridItem>
                                </Grid>
                                <Grid cols='12'>
                                    <GridItem col='12' className='comment-title'>
                                        <Text size='xs' view='primary'>
                                            Theme: {comment.name}
                                        </Text>
                                    </GridItem>
                                </Grid>
                                <Grid cols='12'>
                                    <GridItem col='12' className='comment-body'>
                                        <Text size='xs' view='primary'>
                                            {comment.body}
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