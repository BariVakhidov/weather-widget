import React, {FC, memo} from 'react'
import cn from 'classnames'
import styles from './InfoItem.module.scss'

interface Props {
    style?: string;
}

export const InfoItem:FC<Props> = memo(({children, style}) => {
    return (
        <div className={cn(styles.infoItem, style)}>
            {children}
        </div>
    )
})
