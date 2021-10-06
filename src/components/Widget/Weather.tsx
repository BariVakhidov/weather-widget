import React, { useEffect, useState, FC, memo } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import styles from './Widget.module.scss'
import { weatherClient } from '@/client/WeatherClient/WeatherCLient'
import { Nullable } from '@/types'
import settings from '@Assets/images/settings.png'
import pressure from '@Assets/images/barometer.png'
import wind from '@Assets/images/wind.png'
import { GetWeatherByLocation, WeatherByCityResponse } from '@/client/WeatherClient/weatherClient-types'
import { Icon } from '@Components/common/icon/Icon'
import { InfoItem } from './InfoItem/InfoItem';
import { getDewPoint } from '@/utils/getDewPoint';

export const Weather: FC = memo(() => {
    const [weatherData, setWeatherData] = useState<Nullable<WeatherByCityResponse>>(null)

    const getWeather = async (params?: GetWeatherByLocation) => {
        const response = params ? await weatherClient.getWeatherByCoordinates(params) : await weatherClient.getWeatherByCity('saint petersburg');
        setWeatherData(response)
    }

    useEffect(() => {
        setTimeout(() => navigator.geolocation.getCurrentPosition(position => getWeather({ lon: position.coords.longitude, lat: position.coords.latitude }), error => {
            console.log(error)
            getWeather()
        }), 500)
        return () => {
            setWeatherData(null)
        }
    }, [])

    if (!weatherData) {
        return <LoadingOutlined />
    }
    const icon = weatherData.weather[0].icon
    return (
        <div>
            <div className={styles.title}>
                <span>{weatherData.name}, {weatherData.sys.country}</span>
                <Icon style={styles.settings} source={settings} height={15} />
            </div>
            <div className={styles.temperature}>
                <img src={`http://openweathermap.org/img/wn/${icon}.png`} />
                <div>{Math.floor(weatherData.main.temp)}°C</div>
            </div>
            <div className={styles.items}>
                <InfoItem>Feels like {Math.floor(weatherData.main.feels_like)}°C, {weatherData.weather[0].description}</InfoItem>
                <InfoItem><Icon source={pressure} height={15} /> {Math.floor(weatherData.main.pressure)} hPa</InfoItem>
                <InfoItem><Icon source={wind} height={15} /> {Math.floor(weatherData.wind.speed)} m/s</InfoItem>

                <InfoItem>Humidity: {weatherData.main.humidity}%</InfoItem>
                <InfoItem>Visibility: {weatherData.visibility / 1000} km</InfoItem>
                <InfoItem>Dew point: {getDewPoint(weatherData.main.temp, weatherData.main.humidity)}°C</InfoItem>
            </div>
        </div>
    )
})