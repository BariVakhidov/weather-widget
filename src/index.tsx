import React from "react"
import "./style.scss"
import {render} from "react-dom"
import {BrowserRouter} from "react-router-dom"
import {App} from "@/app/App"
import "./utils/wdyr"
import "antd/dist/antd.css";
import {WidgetStoreProvider} from "@/logic/store";
import {widgetInitialState, widgetReducer} from "@/logic/widgetReducer";

const AppContainer = () => (
    <React.StrictMode>
        <BrowserRouter>
            <WidgetStoreProvider initialState={widgetInitialState} reducer={widgetReducer}>
                <App/>
            </WidgetStoreProvider>
        </BrowserRouter>
    </React.StrictMode>
);

render(AppContainer(), document.querySelector("weather-widget"));