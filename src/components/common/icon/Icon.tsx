import React, {FC, memo} from "react"
import cn from "classnames"
import styles from "./Icon.module.scss"

interface Props {
    source: string;
    height?: number;
    style?: string;
    onClick?: () => void;
}

export const Icon: FC<Props> = memo(({source, height, onClick, style}) => {
    return <div className={cn(styles.icon_wrapper, style)} onClick={onClick}><img src={source} height={height} alt=""/>
    </div>
})
