import React from 'react'
import './style.scss'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from '@/app/App'

const AppContainer = () => (
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

render(AppContainer(), document.querySelector('weather-widget'));