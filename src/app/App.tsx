import React, { FC } from 'react'
import styles from './App.module.scss'
import { Widget } from '@Components/Widget'

export const App: FC = () => {

    return (
        <div className={styles.widget}>
            <Widget/>
        </div>
    )
}