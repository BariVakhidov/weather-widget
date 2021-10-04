import React, { FC } from 'react'
import styles from './Preloader.module.scss'

export const Preloader: FC = React.memo(() => {
    return (
        <div className={styles.container}>
            <div className={styles.ldsEllipsis}>
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
});
