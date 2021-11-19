import React, {FC, memo, useCallback} from "react"
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
import locationIcon from "@Assets/images/location.png";
import {Error} from "@Components/common/error/Error";

interface Props {
    handleTryToGetLocation: () => void;
}

export const Weather: FC<Props> = memo(({handleTryToGetLocation}) => {
    const [state, dispatch] = useWidgetStore()
    const {weatherData, isFetching, currentLocation, error} = state
    const onLocationClick = () => {
        if (!currentLocation) {
            handleTryToGetLocation()
        }
    }
    const enableConfigMode = useCallback(() => dispatch({
        type: WidgetActions.SET_CONFIG_MODE,
        payload: true
    }), [dispatch])


    if (isFetching) {
        return <LoadingOutlined/>
    }

    if (error) {
        return <Error/>
    }

    if (!weatherData) {
        return <div className={styles.text}>
            Enable geolocation and press <img className={styles.location} onClick={handleTryToGetLocation}
                                              src={locationIcon} alt=""/>
            or add location manually <img onClick={enableConfigMode} className={styles.settings} src={settings} alt=""/>
        </div>
    }

    const icon = weatherData.weather[0].icon
    return (
        <div>
            <div className={styles.title}>
                <span>{weatherData.name}, {weatherData.sys.country}</span>
                <div className={styles.icons}>
                    <img className={styles.location} onClick={onLocationClick} src={locationIcon} alt=""/>
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