import React, {FC, useCallback} from "react"
import styles from "./App.module.scss"
import {Widget} from "@Components/Widget"
import {Icon} from "@Components/common/icon/Icon";
import icon from "@Assets/images/widget-icon.png";
import {useWidgetStore} from "@/logic/store";
import {WidgetActions} from "@/logic/widgetReducer";

export const App: FC = () => {
    const [state, dispatch] = useWidgetStore();
    const closeWidget = useCallback(() => dispatch({type: WidgetActions.SET_VISIBLE, payload: false}), [])
    const openWidget = () => dispatch({type: WidgetActions.SET_VISIBLE, payload: true})

    return (
        <div className={styles.widget}>
            {state.isVisible ? <Widget closeWidget={closeWidget}/> :
                <div className={styles.icon} onClick={openWidget}><Icon source={icon} height={30}/></div>}
        </div>
    )
}