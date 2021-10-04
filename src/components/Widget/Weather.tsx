import React, { useEffect, useState, FC, memo } from 'react'
import styles from './Widget.module.scss'
import { weatherClient } from '@/client/WeatherClient/WeatherCLient'
import { Nullable } from '@/types'
import settings from '@Assets/images/settings.png'
import { Preloader } from '@Components/common/preloader'
import { WeatherByCityResponse } from '@/client/WeatherClient/weatherClient-types'
import { Icon } from '@Components/common/icon/Icon'

export const Weather: FC = memo(() => {
    const [weatherData, setWeatherData] = useState<Nullable<WeatherByCityResponse>>(null)

    const getWeather = async () => {
        const response = await weatherClient.getWeatherByCity('saint petersburg');
        setWeatherData(response)
    }

    useEffect(() => {
        setTimeout(getWeather, 500)
        return () => {
            setWeatherData(null)
        }
    }, [])

    if (!weatherData) {
        return <Preloader />
    }
    const icon = weatherData.weather[0].icon
    return (
        <div>
            <div className={styles.title}>
                <span>{weatherData.name}, {weatherData.sys.country}</span>
                <Icon style={styles.settings} source={settings} height={15}/>
            </div>
            <div className={styles.temperature}>
                <img src={`http://openweathermap.org/img/wn/${icon}.png`} />
                <div>{Math.floor(weatherData.main.temp)}°C</div>
            </div>
            <div>Pressure {Math.floor(weatherData.main.pressure)} hPa</div>
            <div>Feels like {Math.floor(weatherData.main.feels_like)}°C</div>
            <div>Humidity: {weatherData.main.humidity}%</div>
            <div>Visibility: {weatherData.visibility / 1000} km</div>
        </div>
    )
})
