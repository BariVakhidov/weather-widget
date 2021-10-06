import React, {FC, memo} from 'react'
import styles from './InfoItem.module.scss'

export const InfoItem:FC = memo(({children}) => {
    return (
        <div className={styles.infoItem}>
            {children}
        </div>
    )
})
