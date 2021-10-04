import React, { FC, memo } from 'react'

interface Props {
    source: string;
    height?: number;
    style?: string;
    onClick?: () => void;
}

export const Icon: FC<Props> = memo(({ source, height, onClick, style }) => {
    return <div className={style} onClick={onClick}><img src={source} height={height} /></div>
})
