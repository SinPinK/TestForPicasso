/*
страница для отображения подробной информации о посте:
 - тайтл поста
 - полный текст поста
 - инфо о пользователе
 - комментарии
*/
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { IconBackward } from '@consta/icons/IconBackward'

export const InfoPage = () => {
    const [value, setValue] = useState([])

    const clickBack = (event) => {
        //console.log(event.target.id)
        //let id = event.target.id
        window.location.assign('/')
    }

    return (
        <div>
            <Grid cols='12'>
                <Card className='post-full-card' >
                    <Grid col='12'>
                        <GridItem col='2'>
                            <Button view='clear' onlyIcon iconLeft={IconBackward} onClick={(event) => clickBack(event)} />

                        </GridItem>
                    </Grid>
                </Card>
            </Grid>
        </div>
    )
}