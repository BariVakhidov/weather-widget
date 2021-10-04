import React, { useState, memo, FC } from 'react'
import styles from './Widget.module.scss'
import { Icon } from '@Components/common/icon/Icon'
import icon from '@Assets/images/widget-icon.png'
import close from '@Assets/images/cancel.png'
import { Weather } from './Weather'

export const Widget: FC = memo(() => {

    const [isVisible, setVisible] = useState(false)
    const closeWidget = () => setVisible(false)
    const openWidget = () => setVisible(true)

    if (!isVisible) {
        return <div className={styles.icon} onClick={openWidget}><Icon source={icon} height={30} /></div>
    }

    return (
        <>
            <div className={styles.widget}>
                <Weather />
            </div>
            <Icon onClick={closeWidget} source={close} height={15} style={styles.close}/>
        </>
    )
})
