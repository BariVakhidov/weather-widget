import React, {FC, memo, useEffect} from "react";
import {useWidgetStore} from "@/logic/store";
import {WidgetActions} from "@/logic/widgetReducer";
import {Button} from "antd";
import styles from "./Error.module.scss"

export const Error: FC = memo(() => {

    const [, dispatch] = useWidgetStore()

    const clearError = () => dispatch({type: WidgetActions.SET_CONFIG_MODE, payload: true})

    useEffect(() => {
        return () => {
            dispatch({type: WidgetActions.SET_ERROR, payload: null})
        }
    }, [])

    return (
        <div className={styles.error}>
            <span>Some error has occurred, maybe selected city name is incorrect, try to select another</span>
            <Button type="primary" danger ghost onClick={clearError}>
                Ok
            </Button>
        </div>
    );
});