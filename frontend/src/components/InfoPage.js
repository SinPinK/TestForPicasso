/*
страница для отображения подробной информации о посте:
 - тайтл поста
 - полный текст поста
 - инфо о пользователе
 - комментарии
*/
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'

export const InfoPage = () => {
    const [value, setValue] = useState([])

    return (
        <div>
            <p> Ну! Работаю! </p>
        </div>
    )
}