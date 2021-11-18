import React, {FC, memo, useCallback, useLayoutEffect} from "react"
import {LoadingOutlined} from "@ant-design/icons";
import styles from "./Widget.module.scss"
import settings from "@Assets/images/settings.png"
import pressure from "@Assets/images/barometer.png"
import wind from "@Assets/images/wind.png"
import {Icon} from "@Components/common/icon/Icon"
import {InfoItem} from "./InfoItem/InfoItem";
import {getDewPoint} from "@/utils/getDewPoint";
import {useWidgetStore} from "@/logic/store";
import {WidgetActions} from "@/logic/widgetReducer";
import {weatherClient} from "@/client/WeatherClient/WeatherCLient";
import locationIcon from "@Assets/images/location.png";

interface Props {
    handleTryToGetLocation: () => void;
}

export const Weather: FC<Props> = memo(({handleTryToGetLocation}) => {
    const [state, dispatch] = useWidgetStore()
    const {weatherData, isFetching, selectedLocation} = state
    const enableConfigMode = useCallback(() => dispatch({
        type: WidgetActions.SET_CONFIG_MODE,
        payload: true
    }), [dispatch])
    const getWeatherByCity = async (name: string) => {
        dispatch({type: WidgetActions.SET_FETCHING, payload: true})
        try {
            const response = await weatherClient.getWeatherByCity(name);
            dispatch({type: WidgetActions.SET_WEATHER_DATA, payload: response})
        } catch (error) {
            dispatch({type: WidgetActions.SET_ERROR, payload: error})
        } finally {
            setTimeout(() => dispatch({type: WidgetActions.SET_FETCHING, payload: false}), 500)
        }
    }
    useLayoutEffect(() => {
        if (selectedLocation) {
            getWeatherByCity(selectedLocation.name);
        }
    }, [selectedLocation])

    if (isFetching) {
        return <LoadingOutlined/>
    }

    if (!weatherData) {
        return null
    }

    const icon = weatherData.weather[0].icon
    return (
        <div>
            <div className={styles.title}>
                <span>{weatherData.name}, {weatherData.sys.country}</span>
                <div className={styles.icons}>
                    <img className={styles.location} onClick={handleTryToGetLocation} src={locationIcon} alt=""/>
                    <Icon onClick={enableConfigMode} style={styles.settings} source={settings}
                          height={15}/>
                </div>
            </div>
            <div className={styles.temperature}>
                <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt=""/>
                <div>{Math.floor(weatherData.main.temp)}°C</div>
            </div>
            <div className={styles.items}>
                <InfoItem style={styles.item}>Feels
                    like {Math.floor(weatherData.main.feels_like)}°C, {weatherData.weather[0].description}</InfoItem>
                <InfoItem><Icon source={pressure} height={15}/> {Math.floor(weatherData.main.pressure)} hPa</InfoItem>
                <InfoItem>Humidity: {weatherData.main.humidity}%</InfoItem>
                <InfoItem><Icon source={wind} height={15}/> {Math.floor(weatherData.wind.speed)} m/s</InfoItem>
                <InfoItem>Visibility: {weatherData.visibility / 1000} km</InfoItem>
                <InfoItem>Dew point: {getDewPoint(weatherData.main.temp, weatherData.main.humidity)}°C</InfoItem>
            </div>
        </div>
    )
})